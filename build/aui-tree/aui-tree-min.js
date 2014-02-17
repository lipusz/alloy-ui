AUI.add("aui-tree-data",function(o){var i=o.Lang,n=i.isArray,l=i.isBoolean,m=i.isObject,c=i.isUndefined,z="boundingBox",g="children",p="container",r=".",j="id",x="index",u="lazyLoad",e="leaf",w="nextSibling",C="node",d="ownerTree",h="parentNode",t="prevSibling",q="previousSibling",v="tree",s="tree-node",b="tree-data",k=function(A){return(o.instanceOf(A,o.TreeNode));},f=function(A){return(o.instanceOf(A,o.TreeView));},y=o.ClassNameManager.getClassName,a=y(v,C);var B=function(){};B.ATTRS={container:{setter:o.one},children:{value:[],validator:n,setter:"_setChildren"},index:{value:{}}};o.mix(B.prototype,{childrenLength:0,initTreeData:function(){var A=this;A.publish("move");A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});},destructor:function(){var A=this;A.eachChildren(function(D){D.destroy();},true);},getNodeById:function(D){var A=this;return A.get(x)[D];},isRegistered:function(D){var A=this;return !!(A.get(x)[D.get(j)]);},updateReferences:function(F,G,J){var K=this;var I=F.get(h);var A=F.get(d);var H=I&&(I!==G);if(I){if(H){var D=I.get(g);o.Array.removeItem(D,F);I.set(g,D);}I.unregisterNode(F);}if(A){A.unregisterNode(F);}F.set(h,G);F.set(d,J);if(G){G.registerNode(F);}if(J){J.registerNode(F);}if(A!==J){F.eachChildren(function(L){K.updateReferences(L,L.get(h),J);});}if(H){var E=K.getEventOutputMap(F);if(!I.get("children").length){I.collapse();I.hideHitArea();}E.tree.oldParent=I;E.tree.oldOwnerTree=A;K.bubbleEvent("move",E);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(D){A.registerNode(D);},true);},registerNode:function(F){var A=this;var E=F.get(j);var D=A.get(x);if(E){D[E]=F;}if(f(A)){F.addTarget(A);F.set(d,A);}F._inheritOwnerTreeAttrs();A.updateIndex(D);},updateIndex:function(D){var A=this;if(D){A.set(x,D);}},unregisterNode:function(E){var A=this;var D=A.get(x);delete D[E.get(j)];if(f(A)){E.removeTarget(A);}A.updateIndex(D);},collapseAll:function(){var A=this;A.eachChildren(function(D){D.collapse();},true);A.fire("collapseAll",A.getEventOutputMap(A));},expandAll:function(){var A=this;A.eachChildren(function(D){D.expand();},true);A.fire("expandAll",A.getEventOutputMap(A));},selectAll:function(){var A=this;A.eachChildren(function(D){D.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(D){D.unselect();},true);},eachChildren:function(F,D){var A=this;var E=A.getChildren(D);o.Array.each(E,function(G){if(G){F.apply(A,arguments);}});},eachParent:function(E){var D=this;var A=D.get(h);while(A){if(A){E.call(D,A);}A=A.get(h);}},bubbleEvent:function(G,F,H,E){var D=this;D.fire(G,F);if(!H){var A=D.get(h);F=F||{};if(c(E)){E=true;}F.stopActionPropagation=E;while(A){A.fire(G,F);A=A.get(h);}}},createNode:function(D){var A=this;var E=o.TreeNode.nodeTypes[m(D)?D.type:D]||o.TreeNode;return new E(m(D)?D:{});},appendChild:function(F,E){var A=this;var D=A.getEventOutputMap(F);A.bubbleEvent("append",D,E);},_appendChild:function(J){if(J.stopActionPropagation){return false;}var A=this;var I=J.tree.node;var D=A.get(d);var G=A.get(g);A.updateReferences(I,A,D);var H=G.push(I);A.set(g,G);var F=H-2;var E=A.item(F);I._nextSibling=null;I._prevSibling=E;I.render(A.get(p));},item:function(D){var A=this;return A.get(g)[D];},indexOf:function(D){var A=this;return o.Array.indexOf(A.get(g),D);},hasChildNodes:function(){var A=this;return(A.getChildrenLength()>0);},getChildren:function(D){var A=this;var F=[];var E=A.get(g);F=F.concat(E);if(D){A.eachChildren(function(G){F=F.concat(G.getChildren(D));});}return F;},getChildrenLength:function(){var A=this;return(A.childrenLength||A.get(g).length);},getEventOutputMap:function(D){var A=this;return{tree:{instance:A,node:D||A}};},removeChild:function(E){var A=this;var D=A.getEventOutputMap(E);A.bubbleEvent("remove",D);},_removeChild:function(G){if(G.stopActionPropagation){return false;}var A=this;var F=G.tree.node;var D=A.get(d);if(A.isRegistered(F)){F.set(h,null);A.unregisterNode(F);F.set(d,null);if(D){D.unregisterNode(F);}F.get(z).remove();var E=A.get(g);o.Array.removeItem(E,F);A.set(g,E);}},empty:function(){var A=this;A.eachChildren(function(E){var D=E.get(h);if(D){D.removeChild(E);}});},insert:function(J,G,H){var N=this;G=G||this;if(G===J){return false;}var A=G.get(h);if(J&&A){var I=J.get(z);var O=G.get(z);var M=G.get(d);if(H==="before"){O.placeBefore(I);}else{if(H==="after"){O.placeAfter(I);}}var D=[];var L=A.get(z).all("> ul > li");L.each(function(P){D.push(P.getData(s));});var K=I.get(w);J.set(w,K&&K.getData(s));var F=I.get(q);J.set(t,F&&F.getData(s));G.updateReferences(J,A,M);A.set(g,D);}J.render();var E=G.getEventOutputMap(J);E.tree.refTreeNode=G;G.bubbleEvent("insert",E);},insertAfter:function(E,D){var A=this;A.insert(E,D,"after");},insertBefore:function(E,D){var A=this;A.insert(E,D,"before");},getNodeByChild:function(E){var A=this;var D=E.ancestor(r+a);if(D){return D.getData(s);}return null;},_inheritOwnerTreeAttrs:i.emptyFn,_setChildren:function(F){var D=this;var I=[];var E=D.get(p);if(!E){E=D._createNodeContainer();}var G=D;if(k(D)){G=D.get(d);}var A=f(G);var H=true;if(A){H=G.get(u);}D.updateIndex({});if(F.length>0){D.set(e,false);}o.Array.each(F,function(M,K){if(M){if(!k(M)&&m(M)){var L=M[g];var J=L&&L.length;M[d]=G;M[h]=D;if(J&&H){delete M[g];}M=D.createNode(M);if(J&&H){M.childrenLength=L.length;o.setTimeout(function(){M.set(g,L);},50);}}if(A){G.registerNode(M);}M.render(E);if(o.Array.indexOf(I,M)===-1){I.push(M);}}});return I;}});o.TreeData=B;},"@VERSION@",{requires:["aui-base","aui-task-manager"],skinnable:false});AUI.add("aui-tree-node",function(ac){var W=ac.Lang,aL=W.isString,aB=W.isBoolean,aT="alwaysShowHitArea",O="",r="boundingBox",g="children",aH="clearfix",w="collapsed",a="container",aa="content",u="contentBox",j="expanded",o="helper",T="hidden",f="hitAreaEl",G="hitarea",S="icon",aS="iconEl",ar="id",ai="label",U="labelEl",R="lastSelected",aG="leaf",p="node",ak="over",X="ownerTree",e="parentNode",ay="radio",aQ="rendered",aF="selected",s=" ",h="tree",H="tree-node",aO=function(){return Array.prototype.slice.call(arguments).join(s);
},ao=function(A){return(A instanceof ac.TreeNode);},aN=function(A){return(A instanceof ac.TreeView);},E=ac.ClassNameManager.getClassName,af=E(o,aH),y=E(h,w),b=E(h,a),aA=E(h,u),aU=E(h,j),t=E(h,T),au=E(h,G),D=E(h,S),k=E(h,ai),aD=E(h,p),C=E(h,p,aa),av=E(h,p,T,G),i=E(h,p,aG),aK=E(h,p,ak),I=E(h,p,aF),ab='<div class="'+au+'"></div>',q='<div class="'+D+'"></div>',d='<div class="'+k+'"></div>',aR="<ul></ul>",v='<li class="'+aD+'"></li>',Y='<div class="'+aO(af,C)+'"></div>';var M=ac.Component.create({NAME:H,ATTRS:{boundingBox:{valueFn:function(){return ac.Node.create(v);}},contentBox:{valueFn:function(){return ac.Node.create(Y);}},draggable:{value:true,validator:aB},ownerTree:{value:null},label:{value:O,validator:aL},expanded:{value:false,validator:aB},id:{validator:aL,valueFn:function(){return ac.guid();}},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aB},nextSibling:{getter:"_getSibling",value:null,validator:ao},prevSibling:{getter:"_getSibling",value:null,validator:ao},parentNode:{value:null,validator:function(A){return ao(A)||aN(A);}},labelEl:{setter:ac.one,valueFn:function(){var A=this.get(ai);return ac.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ac.one,valueFn:function(){return ac.Node.create(ab);}},alwaysShowHitArea:{value:true,validator:aB},iconEl:{setter:ac.one,valueFn:function(){return ac.Node.create(q);}},tabIndex:{value:null},rendered:{validator:aB,value:false}},AUGMENTS:[ac.TreeData],EXTENDS:ac.Base,prototype:{BOUNDING_TEMPLATE:v,CONTENT_TEMPLATE:Y,initializer:function(){var A=this;var L=A.get(r);L.setData(H,A);A.on({expandedChange:function(aX){A.bubbleEvent(aX.newVal?"expand":"collapse",A.getEventOutputMap(A));}});A._syncTreeNodeBBId();A._uiSetExpanded(A.get(j));A._uiSetLeaf(A.get(aG));A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ac.bind(A._afterSetChildren,A));A.after("expandedChange",ac.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);A.after("leafChange",ac.bind(A._afterLeafChange,A));},render:function(L){var A=this;if(!A.get(aQ)){A.renderUI();A.bindUI();A.syncUI();A.set(aQ,true);}if(L){A.get(r).appendTo(L);}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterExpandedChange:function(L){var A=this;A._uiSetExpanded(L.newVal);},_afterLeafChange:function(L){var A=this;A._uiSetLeaf(L.newVal);},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_renderContentBox:function(aY){var A=this;var L=A.get(u);if(!A.isLeaf()){var aX=A.get(j);L.addClass(aX?aU:y);if(aX){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var aX=A.get(r);var L=A.get(u);var aY=null;L.append(A.get(aS));L.append(A.get(U));aX.append(L);var aY=A.get(a);if(aY){if(!A.get(j)){aY.addClass(t);}aX.append(aY);}return aX;},_createNodeContainer:function(){var A=this;var L=A.get(a)||ac.Node.create(aR);L.addClass(b);A.set(a,L);return L;},_syncHitArea:function(L){var A=this;if(A.get(aT)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ac.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ac.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ac.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aX=0;var L=this;var A=L.get(e);while(A){++aX;A=A.get(e);}return aX;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ac.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(u).hasClass(I);},isLeaf:function(){var A=this;return A.get(aG);},isAncestor:function(aX){var L=this;var A=L.get(e);while(A){if(A===aX){return true;}A=A.get(e);}return false;},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(X);if(L){L.set(R,A);}A.get(u).addClass(I);A.fire("select");},unselect:function(){var A=this;A.get(u).removeClass(I);A.fire("unselect");},over:function(){this.get(u).addClass(aK);},out:function(){this.get(u).removeClass(aK);},showHitArea:function(){var A=this;var L=A.get(f);L.removeClass(av);},hideHitArea:function(){var A=this;var L=A.get(f);L.addClass(av);},_syncTreeNodeBBId:function(L){var A=this;A.get(r).attr(ar,A.get(ar));},_getSibling:function(aZ,L){var A=this;var aY="_"+L;var aX=A[aY];if(aX!==null&&!ao(aX)){aX=null;A[aY]=aX;}return aX;},_uiSetExpanded:function(aY){var A=this;if(!A.isLeaf()){var aX=A.get(a);var L=A.get(u);if(aY){L.replaceClass(y,aU);if(aX){aX.removeClass(t);}}else{L.replaceClass(aU,y);if(aX){aX.addClass(t);}}}},_uiSetLeaf:function(aX){var A=this;var L=A.get(u);if(aX){A.get(a).remove();A.get(f).remove();}else{L.prepend(A.get(f));A._createNodeContainer();A._uiSetExpanded(A.get(j));}L.toggleClass(i,aX);}}});ac.TreeNode=M;var ax=W.isFunction,F=W.isObject,ad=W.isValue,aM="cache",at="end",aj="io",aC="limit",aP="loaded",aV="loading",ah="paginator",am="start",aq="tree-node-io",c="paginatorClick",az=E(h,p,ah),x=E(h,p,aj,aV),aw='<a class="'+az+'" href="javascript:void(0);">Load more results</a>';var K=ac.Component.create({NAME:aq,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:aB},loaded:{value:false,validator:aB},cache:{value:true,validator:aB},leaf:{value:false,validator:aB},paginator:{setter:function(A){return ac.merge({alwaysVisible:false,autoFocus:true,element:ac.Node.create(aw),endParam:at,limitParam:aC,start:0,startParam:am},A);},validator:F}},EXTENDS:ac.TreeNode,prototype:{bindUI:function(){var A=this;ac.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;ac.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;
var aX=A.get(ah);if(aX){var L=ac.bind(A._handlePaginatorClickEvent,A);aX.element.on("click",L);}},createNodes:function(L){var A=this;ac.Array.each(ac.Array(L),function(aY){var aX=A.createNode.call(A,aY);A.appendChild(aX);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(aM);var aZ=A.get(aj);var aX=A.get(aP);var aY=A.get(aV);if(!L){A.set(aP,false);}if(aZ&&!aX&&!aY&&!this.hasChildNodes()){if(!L){A.empty();}A.initIO();}else{ac.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var L=this;var aX=L.get(aj);if(ax(aX.cfg.data)){aX.cfg.data=aX.cfg.data.call(L,L);}L._syncPaginatorIOData(aX);if(ax(aX.loader)){var A=ac.bind(aX.loader,L);A(aX.url,aX.cfg,L);}else{ac.io.request(aX.url,aX.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(u);A.set(aV,true);L.addClass(x);},ioCompleteHandler:function(){var A=this;var L=A.get(u);A.set(aV,false);A.set(aP,true);L.removeClass(x);},ioSuccessHandler:function(){var A=this;var a2=A.get(aj);var aX=Array.prototype.slice.call(arguments);var aZ=aX.length;var L=aX[1];if(aZ>=3){var a1=aX[2];try{L=ac.JSON.parse(a1.responseText);}catch(a0){}}var aY=a2.formatter;if(aY){L=aY(L);}A.createNodes(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(aV,false);A.set(aP,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:aq});},_defPaginatorClickFn:function(L){var A=this;var aX=A.get(ah);if(ad(aX.limit)){aX.start+=aX.limit;}if(A.get(aj)){A.initIO();}},_handlePaginatorClickEvent:function(aY){var A=this;var aX=A.get(X);var L=A.getEventOutputMap(A);A.fire(c,L);if(aX){aX.fire(c,L);}aY.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var aX=L.get(X);if(aX){if(!L.get(aj)){L.set(aj,ac.clone(aX.get(aj)));}if(!L.get(ah)){var A=aX.get(ah);if(A&&A.element){A.element=A.element.clone();}L.set(ah,A);}}},_setIO:function(aX){var A=this;if(!aX){return null;}else{if(aL(aX)){aX={url:aX};}}aX=aX||{};aX.cfg=aX.cfg||{};aX.cfg.on=aX.cfg.on||{};var L={start:ac.bind(A.ioStartHandler,A),complete:ac.bind(A.ioCompleteHandler,A),success:ac.bind(A.ioSuccessHandler,A),failure:ac.bind(A.ioFailureHandler,A)};ac.each(L,function(a0,aY){var a1=aX.cfg.on[aY];if(ax(a1)){var aZ=function(){a0.apply(A,arguments);a1.apply(A,arguments);};aX.cfg.on[aY]=ac.bind(aZ,A);}else{aX.cfg.on[aY]=a0;}});return aX;},_syncPaginatorIOData:function(aY){var A=this;var aX=A.get(ah);if(aX&&ad(aX.limit)){var L=aY.cfg.data||{};L[aX.limitParam]=aX.limit;L[aX.startParam]=aX.start;L[aX.endParam]=(aX.start+aX.limit);aY.cfg.data=L;}},_syncPaginatorUI:function(aY){var a2=this;var L=a2.get(g);var a3=a2.get(ah);if(a3){var a1=true;if(aY){a1=(aY.length>0);}var aX=a2.getChildrenLength();var A=a3.start;var a0=a3.total||aX;var a4=a1&&(a0>aX);if(a3.alwaysVisible||a4){a2.get(a).append(a3.element.show());if(a3.autoFocus){try{a3.element.focus();}catch(aZ){}}}else{a3.element.hide();}}}}});ac.TreeNodeIO=K;var l="checkbox",n="checked",Z="checkContainerEl",aI="checkEl",N="checkName",V=".",m="name",z="tree-node-check",ag=E(h,p,l),an=E(h,p,l,a),ap=E(h,p,n),Q='<div class="'+an+'"></div>',al='<input class="'+ag+'" type="checkbox" />';var aE=ac.Component.create({NAME:z,ATTRS:{checked:{value:false,validator:aB},checkName:{value:z,validator:aL},checkContainerEl:{setter:ac.one,valueFn:function(){return ac.Node.create(Q);}},checkEl:{setter:ac.one,valueFn:function(){var A=this.get(N);return ac.Node.create(al).attr(m,A);}}},EXTENDS:ac.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(n));A.on({checkedChange:function(L){A.bubbleEvent(L.newVal?"check":"uncheck",A.getEventOutputMap(A));}});},renderUI:function(){var L=this;ac.TreeNodeCheck.superclass.renderUI.apply(L,arguments);var aX=L.get(U);var A=L.get(aI);var aY=L.get(Z);A.hide();aY.append(A);aX.placeBefore(aY);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(u);var aX=A.get(U);ac.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ac.bind(A._afterCheckedChange,A));L.delegate("click",ac.bind(A.toggleCheck,A),V+an);L.delegate("click",ac.bind(A.toggleCheck,A),V+k);aX.swallowEvent("dblclick");},check:function(L){var A=this;A.set(n,true,{originalTarget:L});},uncheck:function(L){var A=this;A.set(n,false,{originalTarget:L});},toggleCheck:function(){var L=this;var A=L.get(aI);var aX=A.attr(n);if(!aX){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(n);},_afterCheckedChange:function(L){var A=this;A._uiSetChecked(L.newVal);},_uiSetChecked:function(L){var A=this;if(L){A.get(u).addClass(ap);A.get(aI).attr(n,n);}else{A.get(u).removeClass(ap);A.get(aI).attr(n,O);}}}});ac.TreeNodeCheck=aE;var B="child",P="tree-node-task",J="unchecked",aJ=function(A){return A instanceof ac.TreeNodeCheck;},ae=E(h,p,B,J);var aW=ac.Component.create({NAME:P,EXTENDS:ac.TreeNodeCheck,prototype:{check:function(aX){var A=this;var L=A.get(u);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aJ(aY)){aY.check(aX);}});}A.eachParent(function(aY){if(aJ(aY)&&!aY.isChecked()){aY.get(u).addClass(ae);}});L.removeClass(ae);ac.TreeNodeTask.superclass.check.call(this,aX);},uncheck:function(aX){var A=this;var L=A.get(u);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aY instanceof ac.TreeNodeCheck){aY.uncheck(aX);}});}A.eachParent(function(aY){if(aJ(aY)&&!aY.isChecked()){aY.get(u).removeClass(ae);}});L.removeClass(ae);ac.TreeNodeTask.superclass.uncheck.call(this,aX);}}});ac.TreeNodeTask=aW;ac.TreeNode.nodeTypes={task:ac.TreeNodeTask,check:ac.TreeNodeCheck,node:ac.TreeNode,io:ac.TreeNodeIO};},"@VERSION@",{requires:["aui-tree-data","aui-io","json","querystring-stringify"],skinnable:false});AUI.add("aui-tree-view",function(aa){var S=aa.Lang,ap=S.isBoolean,av=S.isString,aq=aa.UA,q="boundingBox",d="children",a="container",X="content",s="contentBox",R=".",an="file",z="hitarea",P="icon",ae="label",N="lastSelected",at="leaf",p="node",U="ownerTree",F="root",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",aw=function(){return Array.prototype.slice.call(arguments).join(r);
},aj=function(A){return(A instanceof aa.TreeNode);},y=aa.ClassNameManager.getClassName,am=y(f,z),w=y(f,P),i=y(f,ae),u=y(f,p,X),l=y(f,F,a),af=y(f,x,X);var O=aa.Component.create({NAME:K,ATTRS:{type:{value:an,validator:av},lastSelected:{value:null,validator:aj},lazyLoad:{validator:ap,value:true},io:{value:null},paginator:{value:null}},AUGMENTS:[aa.TreeData],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);},bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aC){var aB=aC.one("> *").remove();var aA=aB.outerHTML();var az=aC.one("> ul");var aD=new aa.TreeNode({boundingBox:aC,container:az,label:aA,leaf:!az,ownerTree:A});if(az){aD.render();A._createFromHTMLMarkup(az);}else{aD.render();}var ay=aC.get(c).get(c);var aE=ay.getData(B);if(!aa.instanceOf(aE,aa.TreeNode)){aE=ay.getData(K);}aE.appendChild(aD);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var ay=A.get(d);var az=A.get(e);var aA=y(f,az);L.addClass(af);L.addClass(aw(aA,l));if(!ay.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",aa.bind(A._onClickHitArea,A),R+am);L.delegate("dblclick",aa.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",aa.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",aa.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",aa.bind(A._onMouseLeaveNodeEl,A),R+u);L.delegate("click",aa.bind(A._onClickNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az&&!az.isSelected()){var ay=A.get(N);if(ay){ay.unselect();}az.select();}},_onMouseEnterNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.out();}},_onClickHitArea:function(L){var A=this;var ay=A.getNodeByChild(L.currentTarget);if(ay){ay.toggle();}}}});aa.TreeView=O;var J=S.isNumber,ab="above",b="append",ad="below",al="block",ag="body",au="clearfix",Z="default",t="display",ai="down",v="drag",m="draggable",W="dragCursor",ao="dragNode",h="expanded",n="helper",ar="insert",D="offsetHeight",c="parentNode",ax="scrollDelay",M="state",ah="tree-drag-drop",ak="up",I=aa.DD.DDM,ac=y(n,au),j=y(P),Y=y(f,v,n),o=y(f,v,n,X),H=y(f,v,n,ae),E=y(f,v,ar,ab),V=y(f,v,ar,b),G=y(f,v,ar,ad),k=y(f,v,M,b),Q=y(f,v,M,ar,ab),T=y(f,v,M,ar,ad),C='<div class="'+Y+'">'+'<div class="'+[o,ac].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=aa.Component.create({NAME:ah,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:aa.TreeView,prototype:{direction:ad,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;aa.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;aa.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=aa.Node.create(C).hide();aa.one(ag).append(L);A.set(n,L);I.set(W,Z);},_bindDragDrop:function(){var A=this;var ay=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new aa.DD.Delegate({bubbleTargets:A,container:ay,nodes:R+u,target:true});var az=A.ddDelegate.dd;az.plug(aa.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(aa.Plugin.DDNodeScroll,{scrollDelay:A.get(ax),node:ay});az.removeInvalid("a");if(L){L.detach();}};if(!aq.touch){L=ay.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(V);},_goingDownState:function(L){var A=this;A.dropAction=ad;A.get(n).addClass(T);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ab;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var ay=A.get(n);ay.removeClass(k);ay.removeClass(Q);ay.removeClass(T);if(L){L.removeClass(E);L.removeClass(V);L.removeClass(G);}},_updateNodeState:function(A){var aH=this;var aD=A.drag;var aA=A.drop;var L=aA.get(p);var aG=L.get(c);var aC=aD.get(p).get(c);var az=aG.getData(B);aH._resetState(aH.nodeContent);if(!aC.contains(aG)){var aI=L.get(D)/3;var ay=L.getY();var aF=ay+aI;var aE=ay+aI*2;var aB=aD.mouseXY[1];if((aB>ay)&&(aB<aF)){aH._goingUpState(L);}else{if(aB>aE){aH._goingDownState(L);}else{if((aB>aF)&&(aB<aE)){if(az&&!az.isLeaf()){aH._appendState(L);}else{if(aH.direction===ak){aH._goingUpState(L);}else{aH._goingDownState(L);}}}}}}aH.nodeContent=L;},_afterDropHit:function(aA){var A=this;var aC=A.dropAction;var aB=aA.drag.get(p).get(c);var ay=aA.drop.get(p).get(c);var aD=ay.getData(B);var az=aB.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aD;L.tree.dragNode=az;if(aC===ab){aD.insertBefore(az);A.bubbleEvent("dropInsert",L);}else{if(aC===ad){aD.insertAfter(az);A.bubbleEvent("dropInsert",L);}else{if(aC===b){if(aD&&!aD.isLeaf()){aD.appendChild(az);if(!aD.get(h)){aD.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(ay){var A=this;var L=A.lastY;var az=ay.target.lastXY[1];if(az!==L){A.direction=(az<L)?ak:ai;}A.lastY=az;},_onDragStart:function(aB){var A=this;var az=aB.target;var aD=az.get(p).get(c);var ay=aD.getData(B);var aC=A.get(N);if(aC){aC.unselect();}ay.select();var aA=A.get(n);var L=aA.one(R+H);aA.setStyle(t,al).show();L.html(ay.get(ae));az.set(ao,aA);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var ay=A.getData(B);
if(!aj(ay)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});aa.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd-delegate","dd-proxy"]});AUI.add("aui-tree",function(a){},"@VERSION@",{skinnable:true,use:["aui-tree-data","aui-tree-node","aui-tree-view"]});