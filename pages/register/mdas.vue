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
      type: 'mda'
    }
  },
  mounted: function() {
  },
  methods: {
  }
}
</script>
