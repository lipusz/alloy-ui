AUI.add("aui-form-combobox",function(a){var e=a.Lang,c=a.ClassNameManager.getClassName,f="combobox",d=c(f);var b=a.Component.create({NAME:f,ATTRS:{field:{},fieldWidget:{value:a.Textfield},node:{getter:function(){var g=this;if(g._field){return g._field.get("node");}}},icons:{value:["circle-triangle-b"],validator:e.isArray}},prototype:{renderUI:function(){var g=this;b.superclass.renderUI.call(g);g._renderField();g._renderIcons();},_renderField:function(){var g=this;var h=g.get("contentBox");var i=g.get("field");var j=g.get("fieldWidget");g._field=new j(i).render();h.appendChild(g._field.get("boundingBox"));},_renderIcons:function(){var g=this;var h=g.get("icons");if(h.length){var i=new a.Toolbar({children:h}).render(g.get("contentBox"));g.icons=i;}}}});a.Combobox=b;},"@VERSION@",{skinnable:true,requires:["aui-form-textarea","aui-toolbar"]});