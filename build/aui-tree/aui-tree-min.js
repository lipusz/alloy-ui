AUI.add("aui-tree-data",function(m){var h=m.Lang,l=h.isArray,k=h.isObject,c=h.isUndefined,w="boundingBox",f="children",n="container",p=".",i="id",u="index",t="nextSibling",y="node",d="ownerTree",g="parentNode",r="prevSibling",o="previousSibling",s="tree",q="tree-node",b="tree-data",j=function(z){return(z instanceof m.TreeNode);},e=function(z){return(z instanceof m.TreeView);},v=m.getClassName,a=v(s,y);var x=function(){};x.ATTRS={container:{setter:m.one},children:{value:[],validator:l,setter:"_setChildren"},index:{value:{}}};m.mix(x.prototype,{initializer:function(){var z=this;z.publish("move");z.publish("append",{defaultFn:z._appendChild});z.publish("remove",{defaultFn:z._removeChild});},destructor:function(){var z=this;z.eachChildren(function(A){A.destroy();},true);},getNodeById:function(A){var z=this;return z.get(u)[A];},isRegistered:function(A){var z=this;return !!(z.get(u)[A.get(i)]);},updateReferences:function(C,D,G){var H=this;var F=C.get(g);var z=C.get(d);var E=F&&(F!==D);if(F){if(E){var A=F.get(f);m.Array.removeItem(A,C);F.set(f,A);}F.unregisterNode(C);}if(z){z.unregisterNode(C);}C.set(g,D);C.set(d,G);if(D){D.registerNode(C);}if(G){G.registerNode(C);}if(z!=G){C.eachChildren(function(I){H.updateReferences(I,I.get(g),G);});}if(E){var B=H.getEventOutputMap(C);if(!F.get("children").length){F.collapse();F.hideHitArea();}B.tree.oldParent=F;B.tree.oldOwnerTree=z;H.bubbleEvent("move",B);}},refreshIndex:function(){var z=this;z.updateIndex({});z.eachChildren(function(A){z.registerNode(A);},true);},registerNode:function(C){var z=this;var B=C.get(i);var A=z.get(u);if(B){A[B]=C;}if(e(z)){C.addTarget(z);}C._inheritOwnerTreeAttrs();z.updateIndex(A);},updateIndex:function(A){var z=this;if(A){z.set(u,A);}},unregisterNode:function(B){var z=this;var A=z.get(u);delete A[B.get(i)];if(e(z)){B.removeTarget(z);}z.updateIndex(A);},collapseAll:function(){var z=this;z.eachChildren(function(A){A.collapse();},true);},expandAll:function(){var z=this;z.eachChildren(function(A){A.expand();},true);},selectAll:function(){var z=this;z.eachChildren(function(A){A.select();},true);},unselectAll:function(){var z=this;z.eachChildren(function(A){A.unselect();},true);},eachChildren:function(C,A){var z=this;var B=z.getChildren(A);m.Array.each(B,function(D){if(D){C.apply(z,arguments);}});},eachParent:function(B){var A=this;var z=A.get(g);while(z){if(z){B.apply(A,[z]);}z=z.get(g);}},bubbleEvent:function(D,C,E,B){var A=this;A.fire(D,C);if(!E){var z=A.get(g);C=C||{};if(c(B)){B=true;}C.stopActionPropagation=B;while(z){z.fire(D,C);z=z.get(g);}}},createNode:function(A){var z=this;var B=m.TreeNode.nodeTypes[k(A)?A.type:A]||m.TreeNode;return new B(k(A)?A:{});},appendChild:function(C,B){var z=this;var A=z.getEventOutputMap(C);z.bubbleEvent("append",A,B);},_appendChild:function(G){if(G.stopActionPropagation){return false;}var z=this;var F=G.tree.node;var A=z.get(d);var D=z.get(f);z.updateReferences(F,z,A);var E=D.push(F);z.set(f,D);var C=E-2;var B=z.item(C);F.set(t,null);F.set(r,B);F.render(z.get(n));},item:function(A){var z=this;return z.get(f)[A];},indexOf:function(A){var z=this;return m.Array.indexOf(z.get(f),A);},hasChildNodes:function(){return(this.get(f).length>0);},getChildren:function(A){var z=this;var C=[];var B=z.get(f);C=C.concat(B);if(A){z.eachChildren(function(D){C=C.concat(D.getChildren(A));});}return C;},getEventOutputMap:function(A){var z=this;return{tree:{instance:z,node:A||z}};},removeChild:function(B){var z=this;var A=z.getEventOutputMap(B);z.bubbleEvent("remove",A);},_removeChild:function(D){if(D.stopActionPropagation){return false;}var z=this;var C=D.tree.node;var A=z.get(d);if(z.isRegistered(C)){C.set(g,null);z.unregisterNode(C);C.set(d,null);if(A){A.unregisterNode(C);}C.get(w).remove();var B=z.get(f);m.Array.removeItem(B,C);z.set(f,B);}},empty:function(){var z=this;z.eachChildren(function(B){var A=B.get(g);if(A){A.removeChild(B);}});},insert:function(G,D,E){var K=this;D=D||this;if(D===G){return false;}var z=D.get(g);if(G&&z){var F=G.get(w);var L=D.get(w);var J=D.get(d);if(E==="before"){L.placeBefore(F);}else{if(E==="after"){L.placeAfter(F);}}var A=[];var I=z.get(w).all("> ul > li");I.each(function(M){A.push(M.getData(q));});var H=F.get(t);G.set(t,H&&H.getData(q));var C=F.get(o);G.set(r,C&&C.getData(q));D.updateReferences(G,z,J);z.set(f,A);}G.render();var B=D.getEventOutputMap(G);B.tree.refTreeNode=D;D.bubbleEvent("insert",B);},insertAfter:function(B,A){var z=this;z.insert(B,A,"after");},insertBefore:function(B,A){var z=this;z.insert(B,A,"before");},getNodeByChild:function(B){var z=this;var A=B.ancestor(p+a);if(A){return A.getData(q);}return null;},_inheritOwnerTreeAttrs:h.emptyFn,_setChildren:function(A){var z=this;var B=[];m.Array.each(A,function(C){if(C){if(!j(C)&&k(C)){C=z.createNode(C);}if(!j(z)){C.set(d,z);}else{C.set(d,z.get(d));}C._inheritOwnerTreeAttrs();C.render(z.get(n));if(m.Array.indexOf(B,C)===-1){B.push(C);}}});return B;}});m.TreeData=x;},"@VERSION@",{skinnable:false,requires:["aui-base"]});AUI.add("aui-tree-node",function(ag){var aa=ag.Lang,aP=aa.isString,aF=aa.isBoolean,aY="alwaysShowHitArea",R="",s="boundingBox",g="children",aL="clearfix",x="collapsed",a="container",ae="content",v="contentBox",j="expanded",p="helper",X="hidden",f="hitAreaEl",J="hitarea",V="icon",aX="iconEl",aw="id",am="label",Y="labelEl",U="lastSelected",aK="leaf",q="node",ao="over",ab="ownerTree",e="parentNode",aC="radio",aV="rendered",aJ="selected",t=" ",h="tree",K="tree-node",aT=function(){return Array.prototype.slice.call(arguments).join(t);},at=function(A){return(A instanceof ag.TreeNode);},aR=function(A){return(A instanceof ag.TreeView);},H=ag.getClassName,aj=H(p,aL),B=H(h,x),b=H(h,a),aE=H(h,v),aZ=H(h,j),u=H(h,X),ay=H(h,J),G=H(h,V),k=H(h,am),aH=H(h,q),F=H(h,q,ae),az=H(h,q,X,J),i=H(h,q,aK),aO=H(h,q,ao),M=H(h,q,aJ),af='<div class="'+ay+'"></div>',r='<div class="'+G+'"></div>',d='<div class="'+k+'"></div>',aW="<ul></ul>",w='<li class="'+aH+'"></li>',ac='<div class="'+aT(aj,F)+'"></div>';var P=ag.Component.create({NAME:K,ATTRS:{boundingBox:{valueFn:function(){return ag.Node.create(w);
}},contentBox:{valueFn:function(){return ag.Node.create(ac);}},draggable:{value:true,validator:aF},ownerTree:{value:null},label:{value:R,validator:aP},expanded:{value:false,validator:aF},id:{validator:aP},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aF},nextSibling:{value:null,validator:at},prevSibling:{value:null,validator:at},parentNode:{value:null,validator:function(A){return at(A)||aR(A);}},labelEl:{setter:ag.one,valueFn:function(){var A=this.get(am);return ag.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},alwaysShowHitArea:{value:true,validator:aF},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(r);}},tabIndex:{value:null},rendered:{validator:aF,value:false}},AUGMENTS:[ag.TreeData],EXTENDS:ag.Base,prototype:{BOUNDING_TEMPLATE:w,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;var L=A.get(s);L.setData(K,A);A._syncTreeNodeBBId();A._uiSetExpanded(A.get(j));},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("expandedChange",ag.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);},render:function(a2){var L=this;if(!L.get(aV)){L.renderUI();L.bindUI();L.syncUI();L.set(aV,true);}if(a2){var a3=L.get(s);var A=L.get(e);a3.appendTo(a2);if(A){var a4=A.get(al);if(a4){a3.insertBefore(a4.element);}}}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterExpandedChange:function(L){var A=this;A._uiSetExpanded(L.newVal);},_renderContentBox:function(a3){var A=this;var L=A.get(v);if(A.isLeaf()){L.addClass(i);}else{var a2=A.get(j);L.addClass(a2?aZ:B);if(a2){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var a2=A.get(s);var L=A.get(v);var a3=null;if(!A.isLeaf()){L.append(A.get(f));a3=A._createNodeContainer();}L.append(A.get(aX));L.append(A.get(Y));a2.append(L);if(a3){if(!A.get(j)){a3.addClass(u);}a2.append(a3);}return a2;},_createNodeContainer:function(){var A=this;var L=A.get(a)||ag.Node.create(aW);L.addClass(b);A.set(a,L);A.eachChildren(function(a2){A.appendChild(a2);});return L;},_syncHitArea:function(L){var A=this;if(A.get(aY)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var a2=0;var L=this;var A=L.get(e);while(A){++a2;A=A.get(e);}return a2;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(v).hasClass(M);},isLeaf:function(){var A=this;return A.get(aK);},isAncestor:function(a2){var L=this;var A=L.get(e);while(A){if(A===a2){return true;}A=A.get(e);}return false;},insertAfter:function(a2,L){var A=this;ag.TreeNode.superclass.insertAfter.apply(this,[a2,A]);},insertBefore:function(L){var A=this;ag.TreeNode.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(ab);if(L){L.set(U,A);}A.get(v).addClass(M);A.fire("select");},unselect:function(){var A=this;A.get(v).removeClass(M);A.fire("unselect");},over:function(){this.get(v).addClass(aO);},out:function(){this.get(v).removeClass(aO);},showHitArea:function(){var A=this;var L=A.get(f);L.removeClass(az);},hideHitArea:function(){var A=this;var L=A.get(f);L.addClass(az);},_syncTreeNodeBBId:function(L){var A=this;A.get(s).attr(aw,A.get(aw));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_uiSetExpanded:function(a3){var A=this;if(!A.isLeaf()){var a2=A.get(a);var L=A.get(v);if(a3){L.replaceClass(B,aZ);if(a2){a2.removeClass(u);}}else{L.replaceClass(aZ,B);if(a2){a2.addClass(u);}}}}}});ag.TreeNode=P;var aB=aa.isFunction,I=aa.isObject,ah=aa.isValue,aQ="cache",ax="end",an="io",aG="limit",aU="loaded",a0="loading",al="paginator",aq="start",av="tree-node-io",c="paginatorClick",aD=H(h,q,al),z=H(h,q,an,a0),aA='<a class="'+aD+'" href="javascript:void(0);">Load more results</a>';var O=ag.Component.create({NAME:av,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:aF},loaded:{value:false,validator:aF},cache:{value:true,validator:aF},leaf:{value:false,validator:aF},paginator:{setter:function(A){return ag.merge({alwaysVisible:false,autoFocus:true,element:ag.Node.create(aA),endParam:ax,limitParam:aG,start:0,startParam:aq},A);},validator:I}},EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;ag.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;var a2=A.get(al);if(a2){var L=ag.bind(A._handlePaginatorClickEvent,A);a2.element.on("click",L);}},createNodes:function(L){var A=this;ag.Array.each(ag.Array(L),function(a3){var a2=A.createNode.apply(A,[a3]);A.appendChild(a2);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(aQ);var a4=A.get(an);var a2=A.get(aU);var a3=A.get(a0);if(!L){A.set(aU,false);}if(a4&&!a2&&!a3&&!this.hasChildNodes()){if(!L){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var L=this;var a2=L.get(an);if(aB(a2.cfg.data)){a2.cfg.data=a2.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(a2);if(aB(a2.loader)){var A=ag.bind(a2.loader,L);A(a2.url,a2.cfg,L);
}else{ag.io.request(a2.url,a2.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(v);A.set(a0,true);L.addClass(z);},ioCompleteHandler:function(){var A=this;var L=A.get(v);A.set(a0,false);A.set(aU,true);L.removeClass(z);},ioSuccessHandler:function(){var a8=this;var a4=a8.get(an);var a7=a8.get(ab);var a5=Array.prototype.slice.call(arguments);var a2=a5.length;var A=a5[1];if(a2>=3){var L=a5[2];try{A=ag.JSON.parse(L.responseText);}catch(a3){}}var a6=a4.formatter;if(a6){A=a6(A);}a8.createNodes(A);a8.expand();if(a7&&a7.ddDelegate){a7.ddDelegate.syncTargets();}},ioFailureHandler:function(){var A=this;A.set(a0,false);A.set(aU,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:av});},_defPaginatorClickFn:function(L){var A=this;var a2=A.get(al);if(ah(a2.limit)){a2.start+=a2.limit;}if(A.get(an)){A.initIO();}},_handlePaginatorClickEvent:function(a3){var A=this;var a2=A.get(ab);var L=A.getEventOutputMap(A);A.fire(c,L);if(a2){a2.fire(c,L);}a3.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var a2=L.get(ab);if(a2){if(!L.get(an)){L.set(an,ag.clone(a2.get(an)));}if(!L.get(al)){var A=a2.get(al);if(A&&A.element){A.element=A.element.clone();}L.set(al,A);}}},_setIO:function(a2){var A=this;if(!a2){return null;}else{if(aP(a2)){a2={url:a2};}}a2=a2||{};a2.cfg=a2.cfg||{};a2.cfg.on=a2.cfg.on||{};var L={start:ag.bind(A.ioStartHandler,A),complete:ag.bind(A.ioCompleteHandler,A),success:ag.bind(A.ioSuccessHandler,A),failure:ag.bind(A.ioFailureHandler,A)};ag.each(L,function(a5,a3){var a6=a2.cfg.on[a3];if(aB(a6)){var a4=function(){a5.apply(A,arguments);a6.apply(A,arguments);};a2.cfg.on[a3]=ag.bind(a4,A);}else{a2.cfg.on[a3]=a5;}});return a2;},_syncPaginatorIOData:function(a3){var A=this;var a2=A.get(al);if(a2&&ah(a2.limit)){var L=a3.cfg.data||{};L[a2.limitParam]=a2.limit;L[a2.startParam]=a2.start;L[a2.endParam]=(a2.start+a2.limit);a3.cfg.data=L;}},_syncPaginatorUI:function(a2){var a6=this;var L=a6.get(g);var a7=a6.get(al);if(a7){var a5=true;if(a2){a5=(a2.length>0);}var A=a7.start;var a4=a7.total||L.length;var a8=a5&&(a4>L.length);if(a7.alwaysVisible||a8){a6.get(a).append(a7.element.show());if(a7.autoFocus){try{a7.element.focus();}catch(a3){}}}else{a7.element.hide();}}}}});ag.TreeNodeIO=O;var l="checkbox",o="checked",ad="checkContainerEl",aM="checkEl",Q="checkName",Z=".",m="name",C="tree-node-check",ak=H(h,q,l),ar=H(h,q,l,a),au=H(h,q,o),T='<div class="'+ar+'"></div>',ap='<input class="'+ak+'" type="checkbox" />';var aI=ag.Component.create({NAME:C,ATTRS:{checked:{value:false,validator:aF},checkName:{value:C,validator:aP},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this.get(Q);return ag.Node.create(ap).attr(m,A);}}},EXTENDS:ag.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(o));},renderUI:function(){var L=this;ag.TreeNodeCheck.superclass.renderUI.apply(L,arguments);var a2=L.get(Y);var A=L.get(aM);var a3=L.get(ad);A.hide();a3.append(A);a2.placeBefore(a3);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(v);var a2=A.get(Y);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ag.bind(A._afterCheckedChange,A));L.delegate("click",ag.bind(A.toggleCheck,A),Z+ar);L.delegate("click",ag.bind(A.toggleCheck,A),Z+k);a2.swallowEvent("dblclick");},check:function(L){var A=this;A.set(o,true,{originalTarget:L});},uncheck:function(L){var A=this;A.set(o,false,{originalTarget:L});},toggleCheck:function(){var L=this;var A=L.get(aM);var a2=A.attr(o);if(!a2){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(o);},_afterCheckedChange:function(L){var A=this;A._uiSetChecked(L.newVal);},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(au);A.get(aM).attr(o,o);}else{A.get(v).removeClass(au);A.get(aM).attr(o,R);}}}});ag.TreeNodeCheck=aI;var D="child",S="tree-node-task",N="unchecked",aN=function(A){return A instanceof ag.TreeNodeCheck;},ai=H(h,q,D,N);var a1=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(a2){var A=this;var L=A.get(v);a2=a2||A;if(!A.isLeaf()){A.eachChildren(function(a3){if(aN(a3)){a3.check(a2);}});}A.eachParent(function(a3){if(aN(a3)&&!a3.isChecked()){a3.get(v).addClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.check.apply(this,[a2]);},uncheck:function(a2){var A=this;var L=A.get(v);a2=a2||A;if(!A.isLeaf()){A.eachChildren(function(a3){if(a3 instanceof ag.TreeNodeCheck){a3.uncheck(a2);}});}A.eachParent(function(a3){if(aN(a3)&&!a3.isChecked()){a3.get(v).removeClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.uncheck.apply(this,[a2]);}}});ag.TreeNodeTask=a1;var E="tree-node-radio",n=function(A){return A instanceof ag.TreeNodeRadio;},y=H(h,q,aC),W=H(h,q,aC,o);var aS=ag.Component.create({NAME:E,EXTENDS:ag.TreeNodeTask,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(v).addClass(y);},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(this,arguments);},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(W);A.get(aM).attr(o,o);}else{A.get(v).removeClass(W);A.get(aM).attr(o,R);}},_uncheckNodesRadio:function(a3){var A=this;var a2;if(a3){a2=a3.get(g);}else{var L=A.get(ab);if(L){a2=L.get(g);}else{return;}}ag.Array.each(a2,function(a5,a4,a6){if(!a5.isLeaf()){A._uncheckNodesRadio(a5);}if(n(a5)){a5.uncheck();}});}}});ag.TreeNodeRadio=aS;ag.TreeNode.nodeTypes={radio:ag.TreeNodeRadio,task:ag.TreeNodeTask,check:ag.TreeNodeCheck,node:ag.TreeNode,io:ag.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","aui-io","json","querystring-stringify"]});AUI.add("aui-tree-view",function(ab){var T=ab.Lang,aq=T.isBoolean,av=T.isString,q="boundingBox",d="children",a="container",Y="content",s="contentBox",R=".",ao="file",z="hitarea",P="icon",af="label",N="lastSelected",at="leaf",p="node",V="ownerTree",F="root",S="selectOnToggle",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",aw=function(){return Array.prototype.slice.call(arguments).join(r);
},ak=function(A){return(A instanceof ab.TreeNode);},y=ab.getClassName,an=y(f,z),w=y(f,P),i=y(f,af),u=y(f,p,Y),l=y(f,F,a),ag=y(f,x,Y);var O=ab.Component.create({NAME:K,ATTRS:{type:{value:ao,validator:av},lastSelected:{value:null,validator:ak},io:{value:null},paginator:{value:null},selectOnToggle:{validator:aq,value:false}},AUGMENTS:[ab.TreeData],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var ay=A.get(q);var L=A.get(s);A.set(a,L);ay.setData(K,A);},bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;A.refreshIndex();},registerNode:function(L){var A=this;L.set(V,A);ab.TreeView.superclass.registerNode.apply(this,arguments);},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aC){var aB=aC.one("> *").remove();var aA=aB.outerHTML();var aD=new ab.TreeNode({boundingBox:aC,label:aA});var az=aC.one("> ul");if(az){aD.set(at,false);aD.set(a,az);aD.render();A._createFromHTMLMarkup(az);}else{aD.render();}var ay=aC.get(c).get(c);var aE=ay.getData(B);if(!ab.instanceOf(aE,ab.TreeNode)){aE=ay.getData(K);}aE.appendChild(aD);});},_renderElements:function(){var A=this;var L=A.get(s);var ay=A.get(d);var az=A.get(e);var aA=y(f,az);L.addClass(ag);L.addClass(aw(aA,l));if(!ay.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",ab.bind(A._onClickNodeEl,A),R+u);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",ab.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",ab.bind(A._onMouseLeaveNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){if(L.target.test(R+an)){az.toggle();if(!A.get(S)){return;}}if(!az.isSelected()){var ay=A.get(N);if(ay){ay.unselect();}az.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.out();}},_onClickHitArea:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.toggle();}}}});ab.TreeView=O;var J=T.isNumber,ac="above",b="append",ae="below",am="block",ah="body",au="clearfix",aa="default",t="display",aj="down",v="drag",m="draggable",X="dragCursor",ap="dragNode",h="expanded",n="helper",ar="insert",D="offsetHeight",c="parentNode",ax="scrollDelay",M="state",ai="tree-drag-drop",al="up",I=ab.DD.DDM,ad=y(n,au),j=y(P),Z=y(f,v,n),o=y(f,v,n,Y),H=y(f,v,n,af),E=y(f,v,ar,ac),W=y(f,v,ar,b),G=y(f,v,ar,ae),k=y(f,v,M,b),Q=y(f,v,M,ar,ac),U=y(f,v,M,ar,ae),C='<div class="'+Z+'">'+'<div class="'+[o,ad].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=ab.Component.create({NAME:ai,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:ab.TreeView,prototype:{direction:ae,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}A.eachChildren(function(az){if(az.get(m)){var ay=I.getDrag(az.get(s));if(ay){ay.destroy();}}},true);},bindUI:function(){var A=this;ab.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ab.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ab.Node.create(C).hide();ab.one(ah).append(L);A.set(n,L);I.set(X,aa);},_createDrag:function(az){var L=this;if(!L.dragTimers){L.dragTimers=[];}if(!I.getDrag(az)){var A=L.dragTimers;var ay=50*A.length;var aA=setTimeout(function(){if(!I.getDrag(az)){var aB=new ab.DD.Drag({bubbleTargets:L,node:az,target:true}).plug(ab.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ab.Plugin.DDNodeScroll,{scrollDelay:L.get(ax),node:L.get(q)});aB.removeInvalid("a");}ab.Array.removeItem(A,aA);},ay);A.push(aA);}},_bindDragDrop:function(){var A=this;var L=A.get(q);A._createDragInitHandler=ab.bind(function(){A.eachChildren(function(ay){if(ay.get(m)){A._createDrag(ay.get(s));}},true);L.detach("mouseover",A._createDragInitHandler);},A);L.on("mouseover",A._createDragInitHandler);A.after("insert",ab.bind(A._afterAppend,A));A.after("append",ab.bind(A._afterAppend,A));A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(W);},_goingDownState:function(L){var A=this;A.dropAction=ae;A.get(n).addClass(U);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ac;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var ay=A.get(n);ay.removeClass(k);ay.removeClass(Q);ay.removeClass(U);if(L){L.removeClass(E);L.removeClass(W);L.removeClass(G);}},_updateNodeState:function(A){var aH=this;var aD=A.drag;var aA=A.drop;var L=aA.get(p);var aG=L.get(c);var aC=aD.get(p).get(c);var az=aG.getData(B);aH._resetState(aH.nodeContent);if(!aC.contains(aG)){var aI=L.get(D)/3;var ay=L.getY();var aF=ay+aI;var aE=ay+aI*2;var aB=aD.mouseXY[1];if((aB>ay)&&(aB<aF)){aH._goingUpState(L);}else{if(aB>aE){aH._goingDownState(L);}else{if((aB>aF)&&(aB<aE)){if(az&&!az.isLeaf()){aH._appendState(L);}else{if(aH.direction===al){aH._goingUpState(L);}else{aH._goingDownState(L);}}}}}}aH.nodeContent=L;},_afterAppend:function(L){var A=this;var ay=L.tree.node;if(ay.get(m)){A._createDrag(ay.get(s));}},_afterDropHit:function(aA){var A=this;var aC=A.dropAction;var aB=aA.drag.get(p).get(c);var ay=aA.drop.get(p).get(c);var aD=ay.getData(B);var az=aB.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aD;L.tree.dragNode=az;if(aC===ac){aD.insertBefore(az);A.bubbleEvent("dropInsert",L);}else{if(aC===ae){aD.insertAfter(az);A.bubbleEvent("dropInsert",L);}else{if(aC===b){if(aD&&!aD.isLeaf()){aD.appendChild(az);if(!aD.get(h)){aD.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);
A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(ay){var A=this;var L=A.lastY;var az=ay.target.lastXY[1];if(az!==L){A.direction=(az<L)?al:aj;}A.lastY=az;},_onDragStart:function(aB){var A=this;var az=aB.target;var aD=az.get(p).get(c);var ay=aD.getData(B);var aC=A.get(N);if(aC){aC.unselect();}ay.select();var aA=A.get(n);var L=aA.one(R+H);aA.setStyle(t,am).show();L.html(ay.get(af));az.set(ap,aA);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var ay=A.getData(B);if(!ak(ay)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ab.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd-drag","dd-drop","dd-proxy"]});AUI.add("aui-tree",function(a){},"@VERSION@",{use:["aui-tree-data","aui-tree-node","aui-tree-view"],skinnable:true});