(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{332:function(e,t,r){"use strict";function n(e,i){return function(e){if(Array.isArray(e))return e}(e)||function(e,i){var t=[],r=!0,n=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(r=(o=c.next()).done)&&(t.push(o.value),!i||t.length!==i);r=!0);}catch(e){n=!0,l=e}finally{try{r||null==c.return||c.return()}finally{if(n)throw l}}return t}(e,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,"a",function(){return n})},533:function(e,t,r){var content=r(626);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(7).default)("13a17e36",content,!0,{sourceMap:!1})},625:function(e,t,r){"use strict";var n=r(533);r.n(n).a},626:function(e,t,r){(e.exports=r(6)(!1)).push([e.i,".error-box[data-v-7c3da116]{color:#a30000;margin-top:-12px}",""])},656:function(e,t,r){"use strict";r.r(t);r(338),r(34);var n=r(332),l={layout:"user",data:function(){return{fetching:!1,searching:!1,loading:!1,startDate:"",endDate:"",dateMenu:!1,dateMenu2:!1,offices:["ANGD","ATDJ","APPU"],paramsModel:{},searchModel:{params:{bill_number:null,economic_sector:null,anssid:null,generated_before:null,generated_after:null}},pages:{first:"",last:"",previousPage:"",nextPage:""},headers:[{text:"BillNumber",value:"billNumber",sortable:!1},{text:"ANSSID",value:"anssid",sortable:!1},{text:"Payer Name",value:"name",sortable:!1},{text:"Amount Paid (₦)",value:"amountPaid",sortable:!1},{text:"Revenue Name",value:"revenueName",sortable:!1},{text:"Revenue Sector",value:"revenueSector",sortable:!1},{text:"Payment Date",value:"paymentDate",sortable:!1}],bills:[],revenueNames:[],vselect:{revenue_name:""}}},computed:{computedstartDate:function(){return this.formatDate(this.date)}},mounted:function(){this.$store.dispatch("auth/checkPermission",["VIEW_BILL"]),this.getAllBills(),this.getRevenues()},watch:{date:function(e){this.startDate=this.formatDate(this.date)},date2:function(e){this.endDate=this.formatDate(this.date2)}},methods:{clearSearch:function(){this.searchModel.params.bill_number="",this.searchModel.params.economic_sector=void 0,this.searchModel.params.generated_before="",this.searchModel.params.generated_after=""},formatDate:function(e){if(!e)return null;var t=e.split("-"),r=Object(n.a)(t,3),l=r[0],o=r[1],c=r[2];return"".concat(o,"/").concat(c,"/").concat(l)},searchBills:function(){var e=this;arguments.length>0&&void 0!==arguments[0]&&arguments[0];for(var t in this.searching=!0,this.searchModel.params)this.searchModel.params.hasOwnProperty(t)&&null!=this.searchModel.params[t]&&(this.paramsModel[t]=this.searchModel.params[t]);this.paramsModel.revenue_name=this.vselect.revenue_name.code,this.$axios.$get("Bills/search",{params:this.paramsModel}).then(function(t){e.bills=t.data,e.pages.previousPage=t.links.prev,e.pages.nextPage=t.links.next,e.pages.first=t.links.first,e.pages.last=t.links.last,e.searching=!1},function(t){e.errors=t.response.data.error,e.searching=!1})},getAllBills:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.loading=!0;var r="Bills";null!=t&&(r=t),this.$axios.$get(r,{params:this.paramsModel}).then(function(t){e.bills=t.data,e.pages.previousPage=t.links.prev,e.pages.nextPage=t.links.next,e.pages.first=t.links.first,e.pages.last=t.links.last,e.loading=!1},function(t){e.errors=t.response.data.error,e.loading=!1})},getRevenues:function(){var e=this;this.fetching=!0,this.$axios.$get("revenue-systems").then(function(t){e.revenueNames=t.data,e.fetching=!1},function(t){e.fetching=!1})},parseDate:function(e){if(!e)return null;var t=e.split("/"),r=Object(n.a)(t,3),l=r[0],o=r[1],c=r[2];return"".concat(c,"-").concat(l.padStart(2,"0"),"-").concat(o.padStart(2,"0"))}}},o=(r(625),r(30)),c=r(47),d=r.n(c),v=r(130),m=r(117),f=r(635),h=r(633),_=r(123),x=r(133),M=r(340),w=r(124),y=r(317),k=r(120),S=r(631),C=r(132),N=r(666),D=r(546),component=Object(o.a)(l,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"dashboard-wrapper",attrs:{"grid-list-lg":""}},[r("div",{staticClass:"headline mb-5 font-weight-medium"},[e._v("View Cleared Bills")]),e._v(" "),r("v-sheet",{staticClass:"grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4"},[e._v("Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button "),r("br"),e._v(" You can also select multiple bills for printing.")]),e._v(" "),r("v-sheet",{staticClass:"px-4 pt-4 pb-5 my-shadow-2",staticStyle:{opacity:"0.9"}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("div",{staticClass:"caption font-weight-bold mb-1"},[e._v("Bill Number")]),e._v(" "),r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:{required:!1,regex:/^\d{9,13}$/},expression:"{ required: false, regex: /^\\d{9,13}$/ }"}],attrs:{name:"bill number",outline:""},model:{value:e.searchModel.params.bill_number,callback:function(t){e.$set(e.searchModel.params,"bill_number",t)},expression:"searchModel.params.bill_number"}},[r("div",{attrs:{slot:"label"},slot:"label"},[e._v("Bill Number")])]),e._v(" "),r("div",{staticClass:"error-box"},[e._v(e._s(e.errors.first("bill number")))])],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("div",{staticClass:"caption font-weight-bold mb-1"},[e._v("Revenue Sector")]),e._v(" "),r("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:e.fetching,expression:"fetching"}],staticStyle:{position:"absolute",top:"left: 30px",margin:"10px 0 0 100px"},attrs:{width:1,size:11,color:"#757575",indeterminate:""}}),e._v(" "),r("v-select",{attrs:{items:e.revenueNames,"item-text":"name","item-value":"code",outline:""},model:{value:e.searchModel.params.economic_sector,callback:function(t){e.$set(e.searchModel.params,"economic_sector",t)},expression:"searchModel.params.economic_sector"}},[r("div",{attrs:{slot:"label"},slot:"label"},[e._v("Choose")])])],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("div",{staticClass:"caption font-weight-bold mb-1"},[e._v("ANSSID")]),e._v(" "),r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:{required:!1,regex:/^\d{10}$/},expression:"{ required: false, regex: /^\\d{10}$/ }"}],attrs:{name:"anssid",outline:""},model:{value:e.searchModel.params.anssid,callback:function(t){e.$set(e.searchModel.params,"anssid",t)},expression:"searchModel.params.anssid"}},[r("div",{attrs:{slot:"label"},slot:"label"},[e._v("ANSSID")])]),e._v(" "),r("div",{staticClass:"error-box"},[e._v(e._s(e.errors.first("anssid")))])],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("div",{staticClass:"caption font-weight-bold mb-1"},[e._v("Generated Before")]),e._v(" "),r("v-menu",{ref:"dateMenu",attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-text-field",e._g({attrs:{outline:"",label:"Choose Date","append-icon":"mdi-calendar-clock"},model:{value:e.searchModel.params.generated_before,callback:function(t){e.$set(e.searchModel.params,"generated_before",t)},expression:"searchModel.params.generated_before"}},n))]}}]),model:{value:e.dateMenu,callback:function(t){e.dateMenu=t},expression:"dateMenu"}},[e._v(" "),r("v-date-picker",{attrs:{color:"secondary","no-title":""},on:{input:function(t){e.dateMenu=!1}},model:{value:e.searchModel.params.generated_before,callback:function(t){e.$set(e.searchModel.params,"generated_before",t)},expression:"searchModel.params.generated_before"}})],1)],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("div",{staticClass:"caption font-weight-bold mb-1"},[e._v("Generated After")]),e._v(" "),r("v-menu",{ref:"dateMenu2",attrs:{"close-on-content-click":!1,"nudge-right":40,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-text-field",e._g({attrs:{outline:"",label:"Choose Date","append-icon":"mdi-calendar-clock"},model:{value:e.searchModel.params.generated_after,callback:function(t){e.$set(e.searchModel.params,"generated_after",t)},expression:"searchModel.params.generated_after"}},n))]}}]),model:{value:e.dateMenu2,callback:function(t){e.dateMenu2=t},expression:"dateMenu2"}},[e._v(" "),r("v-date-picker",{attrs:{color:"secondary","no-title":""},on:{input:function(t){e.dateMenu2=!1}},model:{value:e.searchModel.params.generated_after,callback:function(t){e.$set(e.searchModel.params,"generated_after",t)},expression:"searchModel.params.generated_after"}})],1)],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md2:"","mx-auto":""}},[r("v-btn",{staticClass:"secondary caption mt-4",attrs:{small:"",flat:"",block:"",round:"",loading:e.searching,disabled:e.searching},on:{click:e.searchBills}},[e._v("Search")])],1),e._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",md2:"","mx-auto":""}},[e.searching?e._e():r("v-btn",{staticClass:"error caption mt-4",attrs:{small:"",flat:"",block:"",round:"",disabled:e.searching},on:{click:e.clearSearch}},[e._v("Clear")])],1)],1),e._v(" "),r("section",{staticClass:"mt-5"},[r("v-data-table",{attrs:{"hide-actions":"",headers:e.headers,items:e.bills},scopedSlots:e._u([{key:"items",fn:function(t){return[r("td",[e._v(e._s(t.item.BillNumber))]),e._v(" "),r("td",[e._v(e._s(t.item.ANSSID))]),e._v(" "),r("td",[e._v(e._s(t.item.PayerName))]),e._v(" "),r("td",[e._v(e._s(e._f("formatNumber")(t.item.Amount)))]),e._v(" "),r("td",[e._v(e._s(t.item.RevenueName))]),e._v(" "),r("td",[e._v(e._s(t.item.RevenueSystem))]),e._v(" "),r("td",[e._v(e._s(e._f("moment")(t.item.PaymentDate,"YYYY-MM-DD")))])]}}])}),e._v(" "),r("v-flex",{attrs:{xs12:"",sm7:"",md7:"","mt-5":"","mx-auto":"","text-xs-center":""}},[r("v-item-group",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"v-btn-group"},[r("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-btn",e._g({staticClass:"secondary ",attrs:{flat:""},on:{click:function(t){return e.getAllBills(e.pages.first)}}},n),[r("v-icon",{attrs:{right:""}},[e._v("fast_rewind")])],1)]}}])},[e._v(" "),r("span",[e._v("Firstpage")])]),e._v(" "),r("v-btn",{staticClass:"secondary",attrs:{flat:"",disabled:null==e.pages.previousPage},on:{click:function(t){return e.getAllBills(e.pages.previousPage)}}},[r("v-icon",{attrs:{right:""}},[e._v("mdi-arrow-left-bold")]),e._v(" Previous Page\n            ")],1),e._v(" "),r("v-btn",{staticClass:"secondary",attrs:{flat:"",disabled:null==e.pages.nextPage},on:{click:function(t){return e.getAllBills(e.pages.nextPage)}}},[e._v("Next Page "),r("v-icon",{attrs:{right:""}},[e._v("mdi-arrow-right-bold")])],1),e._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-btn",e._g({staticClass:"secondary ",attrs:{flat:""},on:{click:function(t){return e.getAllBills(e.pages.last)}}},n),[r("v-icon",{attrs:{right:""}},[e._v("fast_forward")])],1)]}}])},[e._v(" "),r("span",[e._v("Lastpage")])])],1),e._v(" "),r("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],attrs:{indeterminate:"",color:"blue"}})],1)],1)],1)],1)},[],!1,null,"7c3da116",null);t.default=component.exports;d()(component,{VBtn:v.a,VContainer:m.a,VDataTable:f.a,VDatePicker:h.a,VFlex:_.a,VIcon:x.a,VItemGroup:M.b,VLayout:w.a,VMenu:y.a,VProgressCircular:k.a,VSelect:S.a,VSheet:C.a,VTextField:N.a,VTooltip:D.a})}}]);