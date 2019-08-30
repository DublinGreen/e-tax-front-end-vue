<template>
<div>
    <v-alert
        :value="true"
        type="success"
        style="margin-bottom:40px;"
        v-if="data.success != null"
    >
        <span>{{ data.success }}</span>
    </v-alert>
    <v-alert
        :value="true"
        type="error"
        style="margin-bottom:40px;"
        v-if="data.errors != null"
    >
        Please fix the following errors<br>
        <ul v-if="typeof data.errors != 'string'">
        <li v-for="(error, i) in data.errors" :key="i" >{{ error[0] }}</li>
        </ul>
        <span v-else>{{ data.errors }}</span>
    </v-alert>
</div>
    
</template>
<script>
export default {
    props:{
        data: {
            type:Object,
            default : {
                errors:null,
                success:null
            }
        }
    }
}
</script>