(self.webpackChunk=self.webpackChunk||[]).push([[1779],{1324:(e,t,r)=>{var n=r(9755);function i(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,a=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e,t,r,n,i,o,a){try{var c=e[o](a),l=c.value}catch(e){return void r(e)}c.done?t(l):Promise.resolve(l).then(n,i)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function c(e){a(o,n,i,c,l,"next",e)}function l(e){a(o,n,i,c,l,"throw",e)}c(void 0)}))}}r(3076),r(9826),r(1539),r(9554),r(4747),r(8783),r(6992),r(3948),r(3710),r(8674),r(7042),r(8309),r(1038),r(4916),r(2526),r(1817),r(2165),r(9753);var l=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});n(document).ready((function(){function e(){var e=n("body #salle_pointeuse").val(),t=n("body #datetime_pointeuse").val(),r=n("body #datetime_pointeuse_fin").val(),i="yes";return""!=e&&""!=t&&""!=r||(l.fire({icon:"error",title:"Veuillez remplir tous les champs !!"}),i="no"),i}n("body #p_check").on("click",(function(){!function(){for(var e=document.getElementsByName("chk"),t=0;t<e.length;t++)"checkbox"==e[t].type&&(e[t].checked=!0)}()})),n("body #p_uncheck").on("click",(function(){!function(){for(var e=document.getElementsByName("chk"),t=0;t<e.length;t++)"checkbox"==e[t].type&&(e[t].checked=!1)}()})),n("#salle_pointeuse").on("change",(function(){var e,t=n(this).val();n(".loader").show(),e=t,n.ajax({type:"POST",url:"/api/pointeuse_aff/"+e,success:function(e){n.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse")&&n("#dtDynamicVerticalScrollExample_pointeuse").DataTable().clear().destroy(),n("#dtDynamicVerticalScrollExample_pointeuse").html(e).DataTable({bLengthChange:!1,lengthMenu:[[11,25,35,50,100,2e13],[10,15,25,50,100,"All"]],"font-size":"3rem"})}})})),n("body #dtDynamicVerticalScrollExample_pointeuse").on("click","tr",(function(){var e=n(this).hasClass("highlighty");if(n("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("highlighty"),n("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("odd"),n("body #dtDynamicVerticalScrollExample_pointeuse tr").removeClass("even"),!e){n(this).addClass("highlighty");var t=n(this).closest("tr");list_pointeuse=[],list_pointeuse.push({sn:t.find("td:eq(2)").html(),ip:t.find("td:eq(3)").html()})}})),n("body #connect_pointeuse").on("click",c(regeneratorRuntime.mark((function t(){var r,o,a,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e(),r=[],n(":checkbox:checked").each((function(e){r[e]=n(this).val()})),"yes"!==e()){t.next=26;break}if(0!==r.length){t.next=8;break}list_pointeuse.forEach((function(e){n(".loader2").show(),n.ajax({type:"POST",url:"/api/pointeuse_connect/"+e.ip+"/ip",success:function(e){n(".loader2").hide(),"true"==e?l.fire({icon:"success",title:"Pointeuse connected"}):l.fire({icon:"error",title:"pointeuse not connected"})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme  !"})}})})),t.next=24;break;case 8:o=i(r),t.prev=9,c=regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.value,e.prev=1,e.next=4,n.ajax({type:"POST",url:"/api/pointeuse_connect/"+t+"/ip",success:function(e){n(".loader2").hide(),"true"==e?(n("."+t).removeClass("desconnected").removeClass("connected").addClass("connected"),l.fire({icon:"success",title:"Pointeuse connected"})):(n("."+t).removeClass("desconnected").removeClass("connected").addClass("desconnected"),l.fire({icon:"error",title:"pointeuse not connected"}))},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme  !"})}});case 4:result=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})),o.s();case 12:if((a=o.n()).done){t.next=16;break}return t.delegateYield(c(),"t0",14);case 14:t.next=12;break;case 16:t.next=21;break;case 18:t.prev=18,t.t1=t.catch(9),o.e(t.t1);case 21:return t.prev=21,o.f(),t.finish(21);case 24:t.next=26;break;case 26:case"end":return t.stop()}}),t,null,[[9,18,21,24]])})))),n("#att_pointeuse").on("click",(function(){e();var t=n("#datetime_pointeuse").val();if(!(r=n("#datetime_pointeuse_fin").val()))var r=0;var i=new Date(t),o=new Date(r);return i?r&&o<i?(l.fire({icon:"error",title:"Veuillez selectionner une date fin plus grande que la date debut!"}),void n(".loader2").hide()):void list_pointeuse.forEach((function(e){n(".loader2").show(),n.ajax({type:"POST",url:"/api/pointeuse_att/"+e.ip+"/"+t+"/"+r,success:function(e){n(".loader2").hide(),n.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse2")&&n("#dtDynamicVerticalScrollExample_pointeuse2").DataTable().clear().destroy(),n("#dtDynamicVerticalScrollExample_pointeuse2").html(e).DataTable({bLengthChange:!1,lengthMenu:[[11,25,35,50,100,2e13],[10,15,25,50,100,"All"]],"font-size":"3rem"})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme au niveau reseau merci de verifier  !"})}})})):(l.fire({icon:"error",title:"Veuillez remplir la date  !"}),void n(".loader2").hide())})),n("#user_pointeuse").on("click",(function(){e(),list_pointeuse.forEach((function(e){n(".loader2").show(),n.ajax({type:"POST",url:"/api/pointeuse_user/"+e.ip,success:function(e){n(".loader2").hide(),n.fn.DataTable.isDataTable("#dtDynamicVerticalScrollExample_pointeuse2")&&n("#dtDynamicVerticalScrollExample_pointeuse2").DataTable().clear().destroy(),n("#dtDynamicVerticalScrollExample_pointeuse2").html(e).DataTable({bLengthChange:!1,lengthMenu:[[11,25,35,50,100,2e13],[10,15,25,50,100,"All"]],"font-size":"3rem"})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme  !"})}})}))})),n("#download_pointeuse").on("click",c(regeneratorRuntime.mark((function t(){var r,o,a,c,s,u,d,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e(),r=n("#datetime_pointeuse").val(),(o=n("#datetime_pointeuse_fin").val())||(o=0),a=new Date(r),c=new Date(o),a){t.next=10;break}return l.fire({icon:"error",title:"Veuillez remplir la date  !"}),n(".loader2").hide(),t.abrupt("return");case 10:if(!(o&&c<a)){t.next=14;break}return l.fire({icon:"error",title:"Veuillez selectionner une date fin plus grande que la date debut!"}),n(".loader2").hide(),t.abrupt("return");case 14:if(s=[],n(":checkbox:checked").each((function(e){s[e]=n(this).val()})),"yes"!==e()){t.next=39;break}if(0!==s.length){t.next=21;break}list_pointeuse.forEach((function(e){n(".loader2").show(),n.ajax({type:"POST",url:"/api/pointeuse_download/"+e.ip+"/"+r+"/"+o,success:function(t){n(".loader2").hide(),l.fire({icon:"success",title:"la pointeuse"+e.ip+" bien importée."})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme technique "+e.ip+" !"})}})})),t.next=37;break;case 21:u=i(s),t.prev=22,f=regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.value,e.prev=1,e.next=4,n.ajax({type:"POST",url:"/api/pointeuse_download/"+t+"/"+r+"/"+o,success:function(e){n(".loader2").hide(),l.fire({icon:"success",title:"la pointeuse"+t+" bien importée."})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme technique "+t+" !"})}});case 4:result=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})),u.s();case 25:if((d=u.n()).done){t.next=29;break}return t.delegateYield(f(),"t0",27);case 27:t.next=25;break;case 29:t.next=34;break;case 31:t.prev=31,t.t1=t.catch(22),u.e(t.t1);case 34:return t.prev=34,u.f(),t.finish(34);case 37:t.next=39;break;case 39:case"end":return t.stop()}}),t,null,[[22,31,34,37]])})))),n("#residanat_Importe").on("click",(function(){n(".loader2").show();var e=n("#datetime_pointeuse").val();if(!e)return l.fire({icon:"error",title:"Veuillez remplir la date  !"}),void n(".loader2").hide();list_pointeuse.forEach((function(t){n.ajax({type:"POST",url:"/api/pointeuse_download/"+t.ip+"/"+e,success:function(e){n(".loader2").hide(),l.fire({icon:"success",title:"la pointeuse bien importée."})},error:function(){n(".loader2").hide(),l.fire({icon:"error",title:"Probleme technique  !"})}})}))}))}))},8533:(e,t,r)=>{"use strict";var n=r(2092).forEach,i=r(9341)("forEach");e.exports=i?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},8457:(e,t,r)=>{"use strict";var n=r(7854),i=r(9974),o=r(6916),a=r(7908),c=r(3411),l=r(7659),s=r(4411),u=r(6244),d=r(6135),f=r(8554),p=r(1246),h=n.Array;e.exports=function(e){var t=a(e),r=s(this),n=arguments.length,v=n>1?arguments[1]:void 0,m=void 0!==v;m&&(v=i(v,n>2?arguments[2]:void 0));var x,y,g,b,_,k,E=p(t),w=0;if(!E||this==h&&l(E))for(x=u(t),y=r?new this(x):h(x);x>w;w++)k=m?v(t[w],w):t[w],d(y,w,k);else for(_=(b=f(t,E)).next,y=r?new this:[];!(g=o(_,b)).done;w++)k=m?c(b,v,[g.value,w],!0):g.value,d(y,w,k);return y.length=w,y}},9341:(e,t,r)=>{"use strict";var n=r(7293);e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},3411:(e,t,r)=>{var n=r(9670),i=r(9212);e.exports=function(e,t,r,o){try{return o?t(n(r)[0],r[1]):t(r)}catch(t){i(e,"throw",t)}}},2261:(e,t,r)=>{"use strict";var n,i,o=r(6916),a=r(1702),c=r(1340),l=r(7066),s=r(2999),u=r(2309),d=r(30),f=r(9909).get,p=r(9441),h=r(7168),v=u("native-string-replace",String.prototype.replace),m=RegExp.prototype.exec,x=m,y=a("".charAt),g=a("".indexOf),b=a("".replace),_=a("".slice),k=(i=/b*/g,o(m,n=/a/,"a"),o(m,i,"a"),0!==n.lastIndex||0!==i.lastIndex),E=s.BROKEN_CARET,w=void 0!==/()??/.exec("")[1];(k||w||E||p||h)&&(x=function(e){var t,r,n,i,a,s,u,p=this,h=f(p),S=c(e),D=h.raw;if(D)return D.lastIndex=p.lastIndex,t=o(x,D,S),p.lastIndex=D.lastIndex,t;var T=h.groups,A=E&&p.sticky,I=o(l,p),C=p.source,P=0,R=S;if(A&&(I=b(I,"y",""),-1===g(I,"g")&&(I+="g"),R=_(S,p.lastIndex),p.lastIndex>0&&(!p.multiline||p.multiline&&"\n"!==y(S,p.lastIndex-1))&&(C="(?: "+C+")",R=" "+R,P++),r=new RegExp("^(?:"+C+")",I)),w&&(r=new RegExp("^"+C+"$(?!\\s)",I)),k&&(n=p.lastIndex),i=o(m,A?r:p,R),A?i?(i.input=_(i.input,P),i[0]=_(i[0],P),i.index=p.lastIndex,p.lastIndex+=i[0].length):p.lastIndex=0:k&&i&&(p.lastIndex=p.global?i.index+i[0].length:n),w&&i&&i.length>1&&o(v,i[0],r,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(i[a]=void 0)})),i&&T)for(i.groups=s=d(null),a=0;a<T.length;a++)s[(u=T[a])[0]]=i[u[1]];return i}),e.exports=x},7066:(e,t,r)=>{"use strict";var n=r(9670);e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},2999:(e,t,r)=>{var n=r(7293),i=r(7854).RegExp,o=n((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),a=o||n((function(){return!i("a","y").sticky})),c=o||n((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:c,MISSED_STICKY:a,UNSUPPORTED_Y:o}},9441:(e,t,r)=>{var n=r(7293),i=r(7854).RegExp;e.exports=n((function(){var e=i(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))},7168:(e,t,r)=>{var n=r(7293),i=r(7854).RegExp;e.exports=n((function(){var e=i("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},9826:(e,t,r)=>{"use strict";var n=r(2109),i=r(2092).find,o=r(1223),a="find",c=!0;a in[]&&Array(1).find((function(){c=!1})),n({target:"Array",proto:!0,forced:c},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(a)},9554:(e,t,r)=>{"use strict";var n=r(2109),i=r(8533);n({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},1038:(e,t,r)=>{var n=r(2109),i=r(8457);n({target:"Array",stat:!0,forced:!r(7072)((function(e){Array.from(e)}))},{from:i})},9753:(e,t,r)=>{r(2109)({target:"Array",stat:!0},{isArray:r(3157)})},7042:(e,t,r)=>{"use strict";var n=r(2109),i=r(7854),o=r(3157),a=r(4411),c=r(111),l=r(1400),s=r(6244),u=r(5656),d=r(6135),f=r(5112),p=r(1194),h=r(206),v=p("slice"),m=f("species"),x=i.Array,y=Math.max;n({target:"Array",proto:!0,forced:!v},{slice:function(e,t){var r,n,i,f=u(this),p=s(f),v=l(e,p),g=l(void 0===t?p:t,p);if(o(f)&&(r=f.constructor,(a(r)&&(r===x||o(r.prototype))||c(r)&&null===(r=r[m]))&&(r=void 0),r===x||void 0===r))return h(f,v,g);for(n=new(void 0===r?x:r)(y(g-v,0)),i=0;v<g;v++,i++)v in f&&d(n,i,f[v]);return n.length=i,n}})},3710:(e,t,r)=>{var n=r(1702),i=r(1320),o=Date.prototype,a="Invalid Date",c="toString",l=n(o.toString),s=n(o.getTime);String(new Date(NaN))!=a&&i(o,c,(function(){var e=s(this);return e==e?l(this):a}))},8309:(e,t,r)=>{var n=r(9781),i=r(6530).EXISTS,o=r(1702),a=r(3070).f,c=Function.prototype,l=o(c.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=o(s.exec);n&&!i&&a(c,"name",{configurable:!0,get:function(){try{return u(s,l(this))[1]}catch(e){return""}}})},4916:(e,t,r)=>{"use strict";var n=r(2109),i=r(2261);n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},4747:(e,t,r)=>{var n=r(7854),i=r(8324),o=r(8509),a=r(8533),c=r(8880),l=function(e){if(e&&e.forEach!==a)try{c(e,"forEach",a)}catch(t){e.forEach=a}};for(var s in i)i[s]&&l(n[s]&&n[s].prototype);l(o)}},e=>{e.O(0,[9755,9812,9817,1259],(()=>{return t=1324,e(e.s=t);var t}));e.O()}]);