AUI.add("aui-carousel",function(q){var e=q.Lang,p=" ",k="carousel",C=q.getClassName,m=C(k,"item"),d=C(k,"item","active"),B=C(k,"item","transition"),b=C(k,"menu","active"),t=C(k,"menu","index"),j=C(k,"menu","item"),c=C(k,"menu","next"),i=C(k,"menu","play"),r=C(k,"menu","pause"),a=C(k,"menu","prev"),w=[j,t].join(p),g=[j,t,b].join(p),s=".",h=s+t,o=s+c,f=s+r,v=s+i,x=[v,f].join(),n=s+a,l=new q.Template("<menu>",'<li><a class="',j," ",i,'"></a></li>','<li><a class="',j," ",a,'"></a></li>','<tpl for="items">','<li><a class="',j,' {[ $i == parent.activeIndex ? "',g,'" : "',w,'" ]}">{$index}</a></li>',"</tpl>",'<li><a class="',j," ",c,'"></a></li>',"</menu>"),z=q.Widget.UI_SRC,y={src:z};var u=q.Component.create({NAME:k,ATTRS:{activeIndex:{value:0,setter:"_setActiveIndex"},animationTime:{value:0.5},intervalTime:{value:0.75},itemSelector:{value:">*"},nodeMenu:{value:null,setter:"_setNodeMenu"},nodeMenuItemSelector:{value:s+j},playing:{value:true}},prototype:{animation:null,nodeSelection:null,nodeMenu:null,initializer:function(){var A=this;A.animation=new q.Anim({duration:A.get("animationTime"),to:{opacity:1}});},renderUI:function(){var A=this;A._updateNodeSelection();A.nodeMenu=A.get("nodeMenu");A._updateMenuNodes();},bindUI:function(){var A=this;A.after({activeIndexChange:A._afterActiveIndexChange,animationTimeChange:A._afterAnimationTimeChange,itemSelectorChange:A._afterItemSelectorChange,intervalTimeChange:A._afterIntervalTimeChange,nodeMenuItemSelector:A._afterNodeMenuItemSelectorChange,playingChange:A._afterPlayingChange});A._bindMenu();if(A.get("playing")===true){A._afterPlayingChange({prevVal:false,newVal:true});}},syncUI:function(){var A=this;A._uiSetActiveIndex(A.get("activeIndex"));},item:function(D){var A=this;A.set("activeIndex",D);},next:function(){var A=this;A._updateIndexNext();},pause:function(){var A=this;A.set("playing",false);},play:function(){var A=this;A.set("playing",true);},prev:function(){var A=this;A._updateIndexPrev();},_afterActiveIndexChange:function(D){var A=this;A._uiSetActiveIndex(D.newVal,{prevVal:D.prevVal,animate:A.get("playing"),src:D.src});},_afterAnimationTimeChange:function(D){var A=this;A.animation.set("duration",D.newVal);},_afterItemSelectorChange:function(D){var A=this;A._updateNodeSelection();},_afterNodeMenuItemSelectorChange:function(D){var A=this;A.nodeMenuItemSelector=D.newVal;A._updateMenuNodes();},_afterIntervalTimeChange:function(D){var A=this;A._clearIntervalRotationTask();A._createIntervalRotationTask();},_afterPlayingChange:function(F){var A=this;var I=A.nodeMenu.one(x);var E=F.newVal;var H=r;var D=i;var G="_clearIntervalRotationTask";if(E){H=i;D=r;G="_createIntervalRotationTask";}A[G]();if(I){I.replaceClass(H,D);}},_bindMenu:function(){var A=this;var D=A.nodeMenu;var E=A.get("nodeMenuItemSelector");D.delegate("click",A._onClickDelegate,E,A);A.nodeMenuItemSelector=E;},_clearIntervalRotationTask:function(){var A=this;clearInterval(A._intervalRotationTask);},_createIndexRandom:function(){var A=this;return Math.ceil(Math.random()*A.nodeSelection.size())-1;},_createIntervalRotationTask:function(){var A=this;A._clearIntervalRotationTask();A._intervalRotationTask=setInterval(function(){A._updateIndexNext({animate:true});},A.get("intervalTime")*1000);},_onAnimationEnd:function(F,G,E,D,H){var A=this;if(E){E.removeClass(B);}G.setStyle("opacity","1");},_onAnimationStart:function(F,G,E,D,H){var A=this;G.addClass(d);if(D){D.addClass(b);}if(E){E.replaceClass(d,B);}if(H){H.removeClass(b);}},_onClickDelegate:function(E){var A=this;E.preventDefault();var F=E.currentTarget;var D;if(F.hasClass(t)){D=A._onMenuItemClick;}else{if(F.hasClass(a)){D=A._updateIndexPrev;}else{if(F.hasClass(c)){D=A._updateIndexNext;}else{if(F.test(x)){D=A._onMenuPlayClick;}}}}if(D){D.apply(A,arguments);}},_onMenuItemClick:function(E){var A=this;E.preventDefault();var D=A.menuNodes.indexOf(E.currentTarget);A.set("activeIndex",D,y);},_onMenuPlayClick:function(D){var A=this;this.set("playing",!this.get("playing"));},_renderMenu:function(){var A=this;var D=l.render({items:A.nodeSelection.getDOM(),activeIndex:A.get("activeIndex")});A.get("contentBox").appendChild(D);return D;},_setActiveIndex:function(D){var A=this;if(D=="rand"){D=A._createIndexRandom();}else{D=Math.max(Math.min(D,A.nodeSelection.size()),-1);}return D;},_setNodeMenu:function(D){var A=this;return q.one(D)||A._renderMenu();},_uiSetActiveIndex:function(E,J){var L=this;var I=null;var G=null;var M=null;var A=null;var K=L.nodeSelection.item(E);var H=L.menuNodes;var D=H.item(E);L.animation.set("node",K);if(J&&!e.isUndefined(J.prevVal)){var F=J.prevVal;K.setStyle("opacity","0");G=H.item(F);I=L.nodeSelection.item(F);I.replaceClass(d,B);L.animation.stop();}else{K.addClass(d);K.setStyle("opacity","1");}M=L.animation.on("start",function(N){L._onAnimationStart(N,K,I,D,G);M.detach();});A=L.animation.on("end",function(N){L._onAnimationEnd(N,K,I,D,G);A.detach();});if(J){if(J.animate){L.animation.run();}else{L.animation.fire("start");L.animation.fire("end");}if(J.src==z&&J.animate){L._createIntervalRotationTask();}}},_updateIndexNext:function(E){var A=this;var D=A.get("activeIndex");var G=A.nodeSelection.size();var F=D+1;if(F>(G-1)){F=0;}if(E){E.src=z;}A.set("activeIndex",F,E);},_updateIndexPrev:function(E){var A=this;var D=A.get("activeIndex");var F=D-1;if(F<0){F=A.nodeSelection.size()-1;}if(E){E.src=z;}A.set("activeIndex",F,E);},_updateMenuNodes:function(){var A=this;A.menuNodes=A.nodeMenu.all(h);},_updateNodeSelection:function(){var A=this;var D=A.get("itemSelector");var E=A.get("contentBox").all(D);E.addClass(m);A.nodeSelection=E;},_intervalRotationTask:null}});q.Carousel=u;},"@VERSION@",{skinnable:true,requires:["aui-base","aui-template","anim"]});
