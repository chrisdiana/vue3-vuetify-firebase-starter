<template>
    <v-card class="mx-auto px-6 py-8">
     	<v-data-table
		    :headers="headers"
		    :items="widgetStore.widgets"
		    :sort-by="[{ key: 'name', order: 'asc' }]"
		    class="elevation-1"
		    dense
		  >
		    <template v-slot:top>
		      <v-toolbar flat>
		        <v-toolbar-title>Widgets</v-toolbar-title>
		        <v-divider
		          class="mx-4"
		          inset
		          vertical
		        ></v-divider>
		        <v-spacer></v-spacer>
		        <v-dialog
		          v-model="dialog"
		          max-width="500px"
		        >
		          <template v-slot:activator="{ props }">
		            <v-btn
		              color="primary"
		              dark
		              class="mb-2"
		              v-bind="props"
		            >
		              New Item
		            </v-btn>
		          </template>
		          <v-card class="pa-4">
		            <v-card-title>
		              <span class="text-bold">{{ formTitle() }}</span>
		            </v-card-title>

		            <v-card-text>
		              <v-container>
		                <v-row>
  										<v-col cols="12" sm="6" md="4"> 
		                  	<v-text-field v-model="editedItem.name"
		                      label="Name"
		                    ></v-text-field>
		                  </v-col>
		                  <v-col cols="12" sm="6" md="4"> 
		                  	<v-text-field v-model="editedItem.foo"
		                      label="Foo"
		                    ></v-text-field>
		                  </v-col>
		                  <v-col cols="12" sm="6" md="4"> 
		                  	<v-text-field v-model="editedItem.bar"
		                      label="Bar"
		                    ></v-text-field>
		                  </v-col>
		                
		                </v-row>
		              </v-container>
		            </v-card-text>

		            <v-card-actions>
		              <v-spacer></v-spacer>
		              <v-btn
		                variant="text"
		                @click="close"
		              >
		                Cancel
		              </v-btn>
		              <v-btn
		                color="primary"
		                variant="text"
		                @click="save"
		              >
		                Save
		              </v-btn>
		            </v-card-actions>
		          </v-card>
		        </v-dialog>
		        <v-dialog v-model="dialogDelete" max-width="500px">
		          <v-card class="pa-4">
		            <v-card-title class="text-bold text-center">Are you sure you want to delete this item?</v-card-title>
		            <v-card-actions>
		              <v-spacer></v-spacer>
		              <v-btn variant="text" @click="closeDelete">Cancel</v-btn>
		              <v-btn color="red" @click="deleteItemConfirm">OK</v-btn>
		              <v-spacer></v-spacer>
		            </v-card-actions>
		          </v-card>
		        </v-dialog>
		      </v-toolbar>
		    </template>
		    <template v-slot:item.created="{ item }">
		    	<span v-if="item.raw.created">
		      {{ moment(new Date(item.raw.created?.seconds*1000)).format("MMM Do YYYY, h:mm a") }}
		    	</span>
		    </template>
		    <template v-slot:item.updated="{ item }">
		    	<span v-if="item.raw.updated">
		      {{ moment(new Date(item.raw.updated?.seconds*1000)).format("MMM Do YYYY, h:mm a") }}
		      </span>
		    </template>
		    <template v-slot:item.actions="{ item }">
		      <v-icon
		        size="small"
		        class="me-2"
		        @click="editItem(item.raw)"
		      >
		        mdi-pencil
		      </v-icon>
		      <v-icon
		        size="small"
		        @click="deleteItem(item.raw)"
		      >
		        mdi-delete
		      </v-icon>
		    </template>
		    <template v-slot:no-data>
		      No data
		    </template>
		  </v-data-table>

    </v-card>

</template>

<script setup>
import { ref, reactive, computed, defineProps, watch, getCurrentInstance, onMounted, onBeforeMount } from 'vue'
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useWidgetStore } from '@/store/widget'
import { useCurrentUser } from 'vuefire'

const appStore = useAppStore()
const widgetStore = useWidgetStore()
//const props = defineProps(['headers', 'items'])
const { emit } = getCurrentInstance();

const dialog = ref(false)
const dialogDelete = ref(false)
const isEdit = ref(false)

const editedItem = ref({
        name: '',
        foo: 0,
        bar: 0,
      });

const defaultItem = ref({
        name: '',
        foo: 0,
        bar: 0,
      })

const headers = [
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Foo', key: 'foo' },
  { title: 'Bar', key: 'bar' },
  { title: 'ID', key: 'id' },
  { title: 'Created', key: 'created' },
  { title: 'Updated', key: 'updated' },
  { title: 'Actions', key: 'actions', sortable: false },
]

function formTitle() {
  return isEdit.value ? 'Edit Item' : 'New Item'
}

function isEditItem(item) {
	return item.hasOwnProperty('id') ? true : false
}

function editItem(item) {
  isEdit.value = isEditItem(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem (item) {
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

async function deleteItemConfirm () {
  await widgetStore.deleteUserWidget(editedItem.value)
  closeDelete()
}

function close () {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  isEdit.value = false
}
function closeDelete () {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  isEdit.value = false
}

async function save() {
	if(isEdit.value) {
		await widgetStore.updateUserWidget(editedItem.value)
	} else {
		await widgetStore.addUserWidget(editedItem.value)
	}
  close()
}

onMounted(async() => {
	await widgetStore.listUserWidgets()
})

</script>



