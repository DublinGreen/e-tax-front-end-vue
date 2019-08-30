<template>
<RegistrationForm :type="type" />
</template>

<script>
import { registration } from '@/utils/route'
import RegistrationForm from '@/components/registrationform'

export default {
  components: {
    RegistrationForm
  },
  data() {
    return {
      type: 'taxauthority'
    }
  },
  mounted: function() {
  },
  methods: {
  }
}
</script>
