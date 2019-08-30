(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{341:function(t,e,r){var content=r(506);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(7).default)("ae7688ee",content,!0,{sourceMap:!1})},342:function(t,e,r){var content=r(508);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(7).default)("49309969",content,!0,{sourceMap:!1})},503:function(t,e,r){"use strict";var o=r(498);e.a={extends:o.b,components:{piechart:o.b},props:["data","options"],mounted:function(){this.renderChart(this.data,this.options)}}},504:function(t,e,r){"use strict";var o=r(498);e.a={extends:o.a,components:{barchart:o.a},mixins:[o.c.reactiveProp],props:["chartData","options"],mounted:function(){this.renderChart(this.chartData,this.options)}}},505:function(t,e,r){"use strict";var o=r(341);r.n(o).a},506:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,".igr-year[data-v-62800fbd]{color:#a3a3a3}.revenue-arrow[data-v-62800fbd]{z-index:9;position:absolute;bottom:3px;left:78%}.left-even[data-v-62800fbd]{left:70%!important}.igr-year-revenue[data-v-62800fbd]{color:hsla(0,0%,39.2%,.911);margin:.3em .2em 0 0}.theme--dark .igr-year-revenue[data-v-62800fbd]{color:#fff}",""])},507:function(t,e,r){"use strict";var o=r(342);r.n(o).a},508:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,".p-container[data-v-7523bb76]{clear:both;width:100%;background-image:linear-gradient(90deg,#f44936 0,#21c392)}.p-line[data-v-7523bb76]{height:100%;background:#dde8ed;float:right}",""])},510:function(t,e,r){var content=r(608);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(7).default)("cedf236e",content,!0,{sourceMap:!1})},536:function(t,e,r){"use strict";r(15);var o={name:"YearlyIGR",props:{arrowType:"",cardType:{type:String,default:"full"},year:{type:Number,required:!0},revenue:{required:!0,type:Number}},methods:{yearFormat:function(t){return t==this.$moment(new Date).format("YYYY")?"Current Year":t}}},n=(r(505),r(30)),c=r(47),l=r.n(c),d=r(123),v=r(133),h=r(132),component=Object(n.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-flex",{class:"full"==t.cardType?"md12":"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards"},[r("h4",{staticClass:"igr-year text-primary",staticStyle:{color:"#0eb074"}},[t._v(t._s(t.yearFormat(t.year))+" Revenue Collection")]),t._v(" "),r("h2",{staticClass:"igr-year-revenue font-weight-medium",class:"full"==t.cardType?"display-2":"headline"},[r("v-icon",{staticClass:"currency",class:"full"==t.cardType?"display-2":"headline"},[t._v("mdi-currency-ngn")]),t._v(t._s(t._f("formatNumber")(t.revenue))+"\n          "),t._v(" "),r("v-icon",{staticClass:"revenue-arrow",attrs:{color:"green lighten-2",size:"48"}},[t._v("arrow_drop_up")])],1)])],1)},[],!1,null,"62800fbd",null);e.a=component.exports;l()(component,{VFlex:d.a,VIcon:v.a,VSheet:h.a})},537:function(t,e,r){"use strict";var o={props:["height","width"],data:function(){return{}},computed:{computedWidth:function(){return 100-parseInt(this.width,10)+"%"}}},n=(r(507),r(30)),component=Object(n.a)(o,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"p-container",style:{height:this.height}},[e("div",{staticClass:"p-line",style:{width:this.computedWidth}})])},[],!1,null,"7523bb76",null);e.a=component.exports},554:function(t,e,r){var map={"./af":368,"./af.js":368,"./ar":369,"./ar-dz":370,"./ar-dz.js":370,"./ar-kw":371,"./ar-kw.js":371,"./ar-ly":372,"./ar-ly.js":372,"./ar-ma":373,"./ar-ma.js":373,"./ar-sa":374,"./ar-sa.js":374,"./ar-tn":375,"./ar-tn.js":375,"./ar.js":369,"./az":376,"./az.js":376,"./be":377,"./be.js":377,"./bg":378,"./bg.js":378,"./bm":379,"./bm.js":379,"./bn":380,"./bn.js":380,"./bo":381,"./bo.js":381,"./br":382,"./br.js":382,"./bs":383,"./bs.js":383,"./ca":384,"./ca.js":384,"./cs":385,"./cs.js":385,"./cv":386,"./cv.js":386,"./cy":387,"./cy.js":387,"./da":388,"./da.js":388,"./de":389,"./de-at":390,"./de-at.js":390,"./de-ch":391,"./de-ch.js":391,"./de.js":389,"./dv":392,"./dv.js":392,"./el":393,"./el.js":393,"./en-SG":394,"./en-SG.js":394,"./en-au":395,"./en-au.js":395,"./en-ca":396,"./en-ca.js":396,"./en-gb":397,"./en-gb.js":397,"./en-ie":398,"./en-ie.js":398,"./en-il":399,"./en-il.js":399,"./en-nz":400,"./en-nz.js":400,"./eo":401,"./eo.js":401,"./es":402,"./es-do":403,"./es-do.js":403,"./es-us":404,"./es-us.js":404,"./es.js":402,"./et":405,"./et.js":405,"./eu":406,"./eu.js":406,"./fa":407,"./fa.js":407,"./fi":408,"./fi.js":408,"./fo":409,"./fo.js":409,"./fr":410,"./fr-ca":411,"./fr-ca.js":411,"./fr-ch":412,"./fr-ch.js":412,"./fr.js":410,"./fy":413,"./fy.js":413,"./ga":414,"./ga.js":414,"./gd":415,"./gd.js":415,"./gl":416,"./gl.js":416,"./gom-latn":417,"./gom-latn.js":417,"./gu":418,"./gu.js":418,"./he":419,"./he.js":419,"./hi":420,"./hi.js":420,"./hr":421,"./hr.js":421,"./hu":422,"./hu.js":422,"./hy-am":423,"./hy-am.js":423,"./id":424,"./id.js":424,"./is":425,"./is.js":425,"./it":426,"./it-ch":427,"./it-ch.js":427,"./it.js":426,"./ja":428,"./ja.js":428,"./jv":429,"./jv.js":429,"./ka":430,"./ka.js":430,"./kk":431,"./kk.js":431,"./km":432,"./km.js":432,"./kn":433,"./kn.js":433,"./ko":434,"./ko.js":434,"./ku":435,"./ku.js":435,"./ky":436,"./ky.js":436,"./lb":437,"./lb.js":437,"./lo":438,"./lo.js":438,"./lt":439,"./lt.js":439,"./lv":440,"./lv.js":440,"./me":441,"./me.js":441,"./mi":442,"./mi.js":442,"./mk":443,"./mk.js":443,"./ml":444,"./ml.js":444,"./mn":445,"./mn.js":445,"./mr":446,"./mr.js":446,"./ms":447,"./ms-my":448,"./ms-my.js":448,"./ms.js":447,"./mt":449,"./mt.js":449,"./my":450,"./my.js":450,"./nb":451,"./nb.js":451,"./ne":452,"./ne.js":452,"./nl":453,"./nl-be":454,"./nl-be.js":454,"./nl.js":453,"./nn":455,"./nn.js":455,"./pa-in":456,"./pa-in.js":456,"./pl":457,"./pl.js":457,"./pt":458,"./pt-br":459,"./pt-br.js":459,"./pt.js":458,"./ro":460,"./ro.js":460,"./ru":461,"./ru.js":461,"./sd":462,"./sd.js":462,"./se":463,"./se.js":463,"./si":464,"./si.js":464,"./sk":465,"./sk.js":465,"./sl":466,"./sl.js":466,"./sq":467,"./sq.js":467,"./sr":468,"./sr-cyrl":469,"./sr-cyrl.js":469,"./sr.js":468,"./ss":470,"./ss.js":470,"./sv":471,"./sv.js":471,"./sw":472,"./sw.js":472,"./ta":473,"./ta.js":473,"./te":474,"./te.js":474,"./tet":475,"./tet.js":475,"./tg":476,"./tg.js":476,"./th":477,"./th.js":477,"./tl-ph":478,"./tl-ph.js":478,"./tlh":479,"./tlh.js":479,"./tr":480,"./tr.js":480,"./tzl":481,"./tzl.js":481,"./tzm":482,"./tzm-latn":483,"./tzm-latn.js":483,"./tzm.js":482,"./ug-cn":484,"./ug-cn.js":484,"./uk":485,"./uk.js":485,"./ur":486,"./ur.js":486,"./uz":487,"./uz-latn":488,"./uz-latn.js":488,"./uz.js":487,"./vi":489,"./vi.js":489,"./x-pseudo":490,"./x-pseudo.js":490,"./yo":491,"./yo.js":491,"./zh-cn":492,"./zh-cn.js":492,"./zh-hk":493,"./zh-hk.js":493,"./zh-tw":494,"./zh-tw.js":494};function o(t){var e=n(t);return r(e)}function n(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=n,t.exports=o,o.id=554},607:function(t,e,r){"use strict";var o=r(510);r.n(o).a},608:function(t,e,r){(t.exports=r(6)(!1)).push([t.i,'.pre-card-title[data-v-1a509a8c]{color:#555!important}table.progress[data-v-1a509a8c]{width:100%;color:#727272;border-spacing:1em}.text-dark[data-v-1a509a8c]{font-size:12px!important;color:#000}table.monthcollection[data-v-1a509a8c]{text-align:left;width:100%;border-collapse:separate;border-spacing:0 14px}table.monthcollection th i[data-v-1a509a8c]{line-height:65%}table.progress th[data-v-1a509a8c]{text-align:left;padding:0!important;font-size:14px;line-height:110%}table.progress th i[data-v-1a509a8c]{line-height:55%}table.progress td[data-v-1a509a8c]{width:60%}table.progress td p[data-v-1a509a8c]{font-size:12px;float:right;margin:0;font-weight:700}table.progress td p[data-v-1a509a8c]:before{content:"\\20A6"}.sidebar-card div[data-v-1a509a8c]:nth-child(2n){background:#f0f0f0!important}.cardbg-1[data-v-1a509a8c]{background-image:url(/cardbg-1.svg)}.cardbg-1[data-v-1a509a8c],.cardbg-2[data-v-1a509a8c]{background-position:50%;background-repeat:no-repeat;background-size:cover}.cardbg-2[data-v-1a509a8c]{background-image:url(/cardbg-2.svg)}.cardbg-3[data-v-1a509a8c]{background-image:url(/cardbg-3.svg)}.cardbg-3[data-v-1a509a8c],.cardbg-4[data-v-1a509a8c]{background-position:50%;background-repeat:no-repeat;background-size:cover}.cardbg-4[data-v-1a509a8c]{background-image:url(/cardbg-4.svg)}.curved-cards-2[data-v-1a509a8c]{border-radius:15px 15px 24px 24px!important;box-shadow:0 4px 20px 0 rgba(0,0,0,.05)!important}.headline[data-v-1a509a8c]{font-weight:500}.pre-card-title[data-v-1a509a8c]{color:#000;font-weight:500}.theme--dark h6.text-primary[data-v-1a509a8c]{color:#ccc!important}.display-2[data-v-1a509a8c]{font-size:17px!important;line-height:20px!important}.display-2[data-v-1a509a8c],.display-3[data-v-1a509a8c]{font-weight:400;letter-spacing:normal!important;font-family:Roboto,sans-serif!important}.display-3[data-v-1a509a8c]{font-size:40px!important;line-height:117%!important;color:#000!important}.curved-cards-custom[data-v-1a509a8c]{box-shadow:none!important}.text-primary[data-v-1a509a8c]{color:#009f70!important}.currency[data-v-1a509a8c],h6[data-v-1a509a8c]{color:#000}.pre-card-title[data-v-1a509a8c]{color:#000!important;font-weight:800}',""])},641:function(t,e,r){"use strict";r.r(e);r(70),r(71),r(16);var o=r(503),n=r(504),c=r(536),l=r(537),d={layout:"user",components:{PieChart:o.a,BarChart:n.a,YearlyIGR:c.a,customProgressBar:l.a},data:function(){return{monthlyRevenueLoaded:!1,mdaIgrLoaded:!1,loading:!1,loading1:!1,loading2:!1,loading3:!1,loading4:!1,loading5:!1,loading6:!1,loading7:!1,loading8:!1,graphLoaded:!1,piechartoptions:{responsive:!0},barchartoptions:{responsive:!0,maintainAspectRatio:!1},piechartData:{labels:["Revenue","Expenses"],datasets:[{label:"Total Revenue vs Expenses YTD",backgroundColor:["#2599FB","#f26b3e"],data:[5e4,3e4]}]},tax_payer:{individual:"",corporate:""},igr_collections:{current:{total:"",year:""},current_1:{total:"",year:""},current_2:{total:"",year:""},current_3:{total:"",year:""},current_month:"",previous_month:""},barchartData:{labels:[],datasets:[{label:"Revenues Collected",backgroundColor:"#1AB6F0",data:[]}]},monthlybarchartData:{labels:[],datasets:[{label:"Monthly Revenues Collected",backgroundColor:"#1DAF87",data:[]}]},heads_collection:[{amount:"",name:"",icon:""}],count_card:{expenses_mtd:"",expenses_ytd:"",igr_mtd:"",igr_ytd:"",total_reg_today:""},data_collection:{dta:"",park_fee:"",paye:"",road_tax:"",waste_mgt:"",wht:""},max_threshold:2e6}},mounted:function(){this.getDashboardValues(),this.countCards(),this.maxThreshold(),this.taxPayer(),this.dataCollection(),this.igrCollections(),this.mdasIgrYtd(),this.monthlyIgrCollection(),this.monthlyRevenueHeadCollection();var t=this;setInterval(function(){t.getDashboardValues()},3e5)},created:function(){},computed:{userPermissions:function(){return this.$store.state.auth.userPermissions}},methods:{countCards:function(){var t=this;this.loading1=!0,this.$axios.$get("dashboard/count_card").then(function(e){t.loading1=!1,t.count_card=e.count_card})},maxThreshold:function(){var t=this;this.loading2=!0,this.$axios.$get("dashboard/max_threshold").then(function(e){t.loading2=!1,t.max_threshold=e.max_threshold})},igrCollections:function(){var t=this;this.loading3=!0,this.$axios.$get("dashboard/igr_collections").then(function(e){t.loading3=!1,t.igr_collections=e.igr_collections})},mdasIgrYtd:function(){var t=this;this.loading4=!0,this.$axios.$get("dashboard/mdas_igr_ytd").then(function(e){e.mdas_igr_ytd.forEach(function(element){t.barchartData.labels.push(element.mda_slug),t.barchartData.datasets[0].data.push(element.amount)}),t.loading4=!1,t.mdaIgrLoaded=!0})},monthlyIgrCollection:function(){var t=this;this.loading5=!0,this.$axios.$get("dashboard/monthly_igr_collection").then(function(e){e.monthly_igr_collection.forEach(function(element){t.monthlybarchartData.labels.push(element.month),t.monthlybarchartData.datasets[0].data.push(element.amount)}),t.loading5=!1,t.monthlyRevenueLoaded=!0})},monthlyRevenueHeadCollection:function(){var t=this;this.loading6=!0,this.$axios.$get("dashboard/monthly_revenue_head_collection").then(function(e){t.loading6=!1,t.heads_collection=e.monthly_revenue_head_collection})},taxPayer:function(){var t=this;this.loading7=!0,this.$axios.$get("dashboard/tax_payer").then(function(e){t.loading7=!1,t.tax_payer=e.tax_payer})},dataCollection:function(){var t=this;this.loading8=!0,this.$axios.$get("dashboard/data_collection").then(function(e){t.loading8=!1,t.data_collection=e})},getDashboardValues:function(){var t=this;this.loading=!0,this.$axios.$get("/dashboard").then(function(e){t.loading=!1,t.graphLoaded=!0,t.count_card=e.data.count_card,t.igr_collections=e.data.igr_collections,t.tax_payer=e.data.tax_payer,e.data.monthly_igr_collection.forEach(function(element){t.monthlybarchartData.labels.push(element.month),t.monthlybarchartData.datasets[0].data.push(element.amount)}),e.data.mdas_igr_ytd.forEach(function(element){t.barchartData.datasets[0].data.push(element.amount),t.barchartData.labels.push(element.mda_slug)}),t.heads_collection=e.data.monthly_revenue_head_collection,t.max_threshold=e.data.max_threshold},function(t){})},generateRandomColor:function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))},computePercent:function(param){var t=param/this.max_threshold*100;return t>100?100:t}}},v=(r(607),r(30)),h=r(47),m=r.n(h),_=r(130),f=r(131),y=r(121),x=r(319),C=r(122),j=r(315),w=r(117),k=r(316),S=r(123),z=r(133),D=r(183),R=r(124),I=r(120),N=r(132),component=Object(v.a)(d,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"dashboard-wrapper",attrs:{"grid-list-xl":""}},[t.userPermissions.includes("VIEW_DASHBOARD")?[[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",sm6:"",lg3:""}},[r("v-sheet",{staticClass:"py-3 cardbg-2 orange curved-cards",attrs:{height:"115",dark:""}},[r("div",{staticClass:"caption mx-3"},[r("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("call_received")]),t._v("Revenue Generated "),r("v-chip",{staticStyle:{height:"18px"}},[t._v("MTD")])],1),t._v(" "),r("v-divider",{staticClass:"mt-2 mb-4"}),t._v(" "),t.loading1?t._e():r("div",{staticClass:"headline mx-3 naira"},[t._v(t._s(t._f("formatNumber")(t.count_card.igr_mtd)))]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading1?r("v-progress-circular",{attrs:{indeterminate:"",color:"#fff",size:"25"}}):t._e()],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",lg3:""}},[r("v-sheet",{staticClass:"py-3 cardbg-3 green lighten-1 curved-cards",attrs:{height:"115",dark:""}},[r("div",{staticClass:"caption mx-3"},[r("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("mdi-finance")]),t._v("Revenue Generated "),r("v-chip",{staticStyle:{height:"18px"}},[t._v("YTD")])],1),t._v(" "),r("v-divider",{staticClass:"mt-2 mb-4"}),t._v(" "),t.loading1?t._e():r("div",{staticClass:"headline mx-3 naira"},[t._v(t._s(t._f("formatNumber")(t.count_card.igr_ytd)))]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading1?r("v-progress-circular",{attrs:{indeterminate:"",color:"#fff",size:"25"}}):t._e()],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",lg3:""}},[r("v-sheet",{staticClass:"py-3 primary cardbg-1 curved-cards",attrs:{height:"115",dark:""}},[r("div",{staticClass:"caption mx-3"},[r("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("call_made")]),t._v("Total Expenses "),r("v-chip",{staticStyle:{height:"18px"}},[t._v("YTD")])],1),t._v(" "),r("v-divider",{staticClass:"mt-2 mb-4"}),t._v(" "),t.loading1?t._e():r("div",{staticClass:"headline mx-3 naira"},[t._v(t._s(t._f("formatNumber")(t.count_card.expenses_ytd)))]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading1?r("v-progress-circular",{attrs:{indeterminate:"",color:"#fff",size:"25"}}):t._e()],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",sm6:"",lg3:""}},[r("v-sheet",{staticClass:"pt-3 cardbg-4 secondary curved-cards",attrs:{height:"115",dark:""}},[r("div",{staticClass:"caption mx-3"},[r("v-icon",{staticClass:"mr-1",attrs:{small:""}},[t._v("mdi-chart-timeline")]),t._v("New ANSSID Registrations\n          ")],1),t._v(" "),r("v-divider",{staticClass:"mt-2"}),t._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{staticClass:"headline pt-4 pl-4 text-xs-center",attrs:{md6:""}},[t.loading1?t._e():r("span",[t._v(t._s(t.count_card.total_reg_today))]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading1?r("v-progress-circular",{attrs:{indeterminate:"",color:"#fff",size:"25"}}):t._e()],1)]),t._v(" "),r("v-flex",{attrs:{md1:""}},[r("v-divider",{staticClass:"ma-0",attrs:{vertical:""}})],1),t._v(" "),r("v-flex",{staticClass:"pt-4",attrs:{md4:""}},[t._v("Today")])],1)],1)],1)],1),t._v(" "),r("v-layout",{staticStyle:{"margin-top":"-10px"},attrs:{row:"",wrap:""}},[t.userPermissions.includes("VIEW_RECEIPT")?r("v-flex",{attrs:{xs6:"",md3:""}},[r("nuxt-link",{attrs:{to:"/receipt-log"}},[r("v-btn",{staticClass:"secondary caption",attrs:{block:""}},[t._v("View Receipts "),r("v-icon",{attrs:{right:""}},[t._v("mdi-receipt")])],1)],1)],1):t._e(),t._v(" "),t.userPermissions.includes("VIEW_TAX_PAYER")?r("v-flex",{attrs:{xs6:"",md3:""}},[r("nuxt-link",{attrs:{to:"/taxpayers"}},[r("v-btn",{staticClass:"secondary caption",attrs:{block:""}},[t._v("Search Taxpayers"),r("v-icon",{attrs:{right:""}},[t._v("search")])],1)],1)],1):t._e(),t._v(" "),t.userPermissions.includes("VIEW_BILL")?r("v-flex",{attrs:{xs6:"",md3:""}},[r("nuxt-link",{attrs:{to:"/bills/view-bills"}},[r("v-btn",{staticClass:"secondary caption",attrs:{block:""}},[t._v("Search Bills"),r("v-icon",{attrs:{right:""}},[t._v("search")])],1)],1)],1):t._e(),t._v(" "),t.userPermissions.includes("VIEW_COLLECTION")?r("v-flex",{attrs:{xs6:"",md3:""}},[r("nuxt-link",{attrs:{to:"/collection"}},[r("v-btn",{staticClass:"secondary caption",attrs:{block:""}},[t._v("View Collections"),r("v-icon",{attrs:{right:""}},[t._v("mdi-rhombus-split")])],1)],1)],1):t._e()],1),t._v(" "),r("section",{staticClass:"mt-3"},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",md6:""}},[r("v-card",{staticStyle:{color:"#555555",height:"445px"},attrs:{"text-xs-left":""}},[r("v-card-title",{staticStyle:{"border-bottom":"1px solid #dbdbdb","padding-top":"20px"},attrs:{"primary-title":""}},[r("div",{staticClass:"headline pre-card-title"},[t._v("IGR Collection Analytics")])]),t._v(" "),r("v-card-media",[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{class:"md12",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year"},[t._v("Current Year IGR")]),t._v(" "),t.loading3?t._e():r("h3",{staticClass:"igr-year-revenue font-weight-medium",class:"display-3"},[r("v-icon",{staticClass:"currency",class:"display-3"},[t._v("mdi-currency-ngn")]),t._v("\n                        "+t._s(t._f("formatNumber")(t.igr_collections.current.total))+"\n                        ")],1),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading3?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-primary"},[t._v("Current Month IGR Collection")]),t._v(" "),t.loading3?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[r("v-icon",{staticClass:"currency",class:"display-2"},[t._v("mdi-currency-ngn")]),t._v("\n                        "+t._s(t._f("formatNumber")(t.igr_collections.current_month))+" "),r("i",{staticClass:"fa fa-star",staticStyle:{color:"#d62c2c","font-size":"26px"}})],1),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading3?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-primary"},[t._v("Previous Month IGR Collection")]),t._v(" "),t.loading3?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[r("v-icon",{staticClass:"currency",class:"display-2"},[t._v("mdi-currency-ngn")]),t._v("\n                        "+t._s(t._f("formatNumber")(t.igr_collections.previous_month))+" "),r("i",{staticClass:"fa fa-caret-up",staticStyle:{color:"#f9a300","font-size":"26px"}})],1),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading3?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-primary"},[t._v(t._s(t.igr_collections.current_1.year)+" IGR Collection")]),t._v(" "),t.loading3?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[r("v-icon",{staticClass:"currency",class:"display-2"},[t._v("mdi-currency-ngn")]),t._v("\n                        "+t._s(t._f("formatNumber")(t.igr_collections.current_1.total))+" "),r("i",{staticClass:"fa fa-star",staticStyle:{color:"#d62c2c","font-size":"26px"}})],1),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading3?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-primary"},[t._v(t._s(t.igr_collections.current_2.year)+" IGR Collection")]),t._v(" "),t.loading3?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[r("v-icon",{staticClass:"currency",class:"display-2"},[t._v("mdi-currency-ngn")]),t._v("\n                        "+t._s(t._f("formatNumber")(t.igr_collections.current_2.total))+" "),r("i",{staticClass:"fa fa-star",staticStyle:{color:"#d62c2c","font-size":"26px"}})],1),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading3?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards curved-cards-custom",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-black"},[t._v("Tax Registration Figure")]),t._v(" "),t.loading7?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[t._v("\n                        "+t._s(t._f("formatNumber_NoDecimal")(t.tax_payer.individual))+"\n                        "),r("i",{staticClass:"fa fa-caret-up",staticStyle:{color:"#f9a300","font-size":"26px"}})]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading7?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1),t._v(" "),r("h5",{staticClass:"text-primary"},[t._v("Individual tax Payers")])])],1),t._v(" "),r("v-flex",{class:"md6",staticStyle:{margin:"0 !important",padding:"5px"}},[r("v-sheet",{staticClass:"pa-3 curved-cards curved-cards-custom",staticStyle:{color:"#888888"}},[r("h4",{staticClass:"igr-year text-primary"},[t._v(" ")]),t._v(" "),t.loading7?t._e():r("h6",{staticClass:"igr-year-revenue font-weight-medium",class:"display-2"},[t._v("\n                        "+t._s(t._f("formatNumber_NoDecimal")(t.tax_payer.corporate))+"\n                        "),r("i",{staticClass:"fa fa-caret-up",staticStyle:{color:"#f9a300","font-size":"26px"}})]),t._v(" "),r("div",{staticClass:"text-xs-center"},[t.loading7?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1),t._v(" "),r("h5",{staticClass:"text-primary"},[t._v("Organisation tax Payers")])])],1)],1)],1)],1)],1),t._v(" "),r("v-flex",{attrs:{xs12:"",md6:""}},[r("v-card",{attrs:{"text-xs-left":""}},[r("v-card-title",{staticStyle:{"border-bottom":"1px solid #dbdbdb","padding-top":"20px"},attrs:{"primary-title":""}},[r("div",{staticClass:"headline pre-card-title"},[t._v("Current month revenue heads collection")])]),t._v(" "),r("v-card-text",{staticStyle:{"padding-top":"0",height:"376px","overflow-y":"scroll"}},[t.loading6?t._e():r("table",{staticClass:"progress",staticStyle:{"text-transform":"capitalize"},attrs:{border:"0"}},t._l(t.heads_collection,function(e,i){return r("tr",{key:i},[r("th",[r("img",{staticStyle:{width:"35px",height:"35px"},attrs:{src:e.icon}})]),t._v(" "),r("th",[r("h6",{staticClass:"body-2 text-dark"},[t._v(t._s(e.name))])]),t._v(" "),r("td",[r("p",{staticClass:"pull-right"},[t._v(t._s(t._f("formatNumber")(e.amount)))]),t._v(" "),r("customProgressBar",{attrs:{height:"10px",width:t.computePercent(e.amount)}})],1)])}),0),t._v(" "),r("div",{staticClass:"text-xs-center mt-5"},[t.loading6?r("v-progress-circular",{attrs:{indeterminate:"",color:"#dbdbdb",size:"25"}}):t._e()],1)])],1)],1)],1)],1),t._v(" "),r("section",{staticClass:"mt-3"},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",md12:""}},[r("v-card",{attrs:{"text-xs-left":""}},[r("v-card-title",{staticStyle:{"border-bottom":"1px solid #dbdbdb","padding-top":"20px"},attrs:{"primary-title":""}},[r("div",{staticClass:"headline pre-card-title"},[t._v("Monthly Revenues Collected\n                    "),r("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:t.loading5,expression:"loading5"}],attrs:{indeterminate:"",color:"#888888"}})],1)]),t._v(" "),r("v-card-text",{staticStyle:{"padding-top":"0"}},[r("v-layout",[r("v-flex",{attrs:{xs12:"",md6:""}},[t.monthlyRevenueLoaded?r("bar-chart",{staticStyle:{width:"100%",height:"300px",color:"#222"},attrs:{chartData:t.monthlybarchartData,options:t.barchartoptions}}):t._e()],1),t._v(" "),r("v-flex",{attrs:{xs12:"",md6:""}},[r("v-flex",{attrs:{xs12:"",md12:""}},[r("v-layout",{staticStyle:{margin:"39px 0 0 10px"},attrs:{row:"",wrap:""}},[r("v-flex",{staticStyle:{"padding-left":"0px","padding-bottom":"0px",background:"#343a4c",color:"#fff"},attrs:{md12:""}},[r("div",{staticClass:"headline",staticStyle:{padding:"0px 0 5px 15px"}},[t._v("Data Current Month Collection")])]),t._v(" "),r("v-flex",{staticStyle:{background:"#2da280",color:"#fff"},attrs:{md4:""}},[r("table",{staticClass:"monthcollection"},[r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v("PAYE "),r("br"),t._v("\n                                    "+t._s(t._f("formatNumber")(t.data_collection.paye))+"\n                                    ")])]),t._v(" "),r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v(" WASTE-MGT "),r("br"),t._v("\n                                    "+t._s(t._f("formatNumber")(t.data_collection.waste_mgt))+"\n                                    ")])])])]),t._v(" "),r("v-flex",{staticStyle:{background:"#21c393",color:"#fff"},attrs:{md4:""}},[r("table",{staticClass:"monthcollection"},[r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v(" DTA "),r("br"),t._v("\n                                  "+t._s(t._f("formatNumber")(t.data_collection.dta))+"\n                                  ")])]),t._v(" "),r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v("ROADTAX "),r("br"),t._v("\n                                  "+t._s(t._f("formatNumber")(t.data_collection.road_tax))+"\n                                  ")])])])]),t._v(" "),r("v-flex",{staticStyle:{background:"#55d5af",color:"#fff"},attrs:{md4:""}},[r("table",{staticClass:"monthcollection"},[r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v("WHT "),r("br"),t._v("\n                                  "+t._s(t._f("formatNumber")(t.data_collection.wht))+"\n                                  ")])]),t._v(" "),r("tr",[r("th",{staticStyle:{"vertical-align":"top"}},[r("v-icon",{attrs:{color:"orange"}},[t._v("label")])],1),t._v(" "),r("th",[t._v("PARK-FEES "),r("br"),t._v("\n                                  "+t._s(t._f("formatNumber")(t.data_collection.park_fee))+"\n                                  ")])])])])],1)],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),r("section",{staticClass:"mt-3"},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",md12:""}},[r("v-card",{attrs:{"text-xs-left":""}},[r("v-card-title",{staticStyle:{"border-bottom":"1px solid #dbdbdb","padding-top":"20px"},attrs:{"primary-title":""}},[r("div",{staticClass:"headline pre-card-title"},[t._v("YTD IGR Collection By Ministries Analytics\n                "),r("v-progress-circular",{directives:[{name:"show",rawName:"v-show",value:t.loading4,expression:"loading4"}],attrs:{indeterminate:"",color:"#888888"}})],1)]),t._v(" "),r("v-card-text",{staticStyle:{"padding-top":"0"}},[t.mdaIgrLoaded?r("bar-chart",{staticStyle:{width:"100%",height:"300px"},attrs:{chartData:t.barchartData,options:t.barchartoptions}}):t._e()],1)],1)],1)],1)],1)]]:[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{staticStyle:{"margin-top":"100px"},attrs:{"text-xs-center":"",xs12:"",sm12:"",lg12:""}},[r("h1",{staticClass:"headline",staticStyle:{"font-size":"67px !important"}},[t._v("WELCOME TO "),r("v-img",{attrs:{src:"/anscims-logo.svg"}})],1)])],1)]],2)},[],!1,null,"1a509a8c",null);e.default=component.exports;m()(component,{VBtn:_.a,VCard:f.a,VCardMedia:y.a,VCardText:x.b,VCardTitle:C.a,VChip:j.a,VContainer:w.a,VDivider:k.a,VFlex:S.a,VIcon:z.a,VImg:D.a,VLayout:R.a,VProgressCircular:I.a,VSheet:N.a})}}]);