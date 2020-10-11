(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[0],[,function(e,t,a){e.exports={BreadBottom:"BurgerIngredient_BreadBottom__31RCp",BreadTop:"BurgerIngredient_BreadTop__3uZiA",Seeds1:"BurgerIngredient_Seeds1__2bISE",Seeds2:"BurgerIngredient_Seeds2__nxu_j",Meat:"BurgerIngredient_Meat__3LLN1",Cheese:"BurgerIngredient_Cheese__OiKGr",Salad:"BurgerIngredient_Salad__wNpzg",Bacon:"BurgerIngredient_Bacon__dxIXe"}},,,,,function(e,t,a){e.exports={BuildControl:"BuildControl_BuildControl__2w8W6",Label:"BuildControl_Label__14Z0p",Less:"BuildControl_Less__2yb4l",More:"BuildControl_More__2A_d3"}},,function(e,t,a){e.exports={BuildControls:"BuildControls_BuildControls__1lhFT",OrderButton:"BuildControls_OrderButton__2liXG",enable:"BuildControls_enable__1JPtJ"}},function(e,t,a){e.exports={Button:"Button_Button__2Ajf-",Success:"Button_Success__34PY3",Danger:"Button_Danger__2nfno"}},,,function(e,t,a){e.exports={Content:"Layout_Content__2ZjSY"}},function(e,t,a){e.exports={Toolbar:"Toolbar_Toolbar__1XByl"}},function(e,t,a){e.exports={Logo:"Logo_Logo__d04QA"}},function(e,t,a){e.exports=a.p+"static/media/burger-logo.b8503d26.png"},function(e,t,a){e.exports={Burger:"Burger_Burger__1R9Jj"}},function(e,t,a){e.exports={Modal:"Modal_Modal__31OI7"}},function(e,t,a){e.exports={Backdrop:"Backdrop_Backdrop__Vem4f"}},,function(e,t,a){e.exports=a(26)},,,,,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(11),c=a.n(l),o=(a(25),a(2)),i=a(3),s=a(5),u=a(4),d=function(e){return e.children},m=a(12),p=a.n(m),b=a(13),h=a.n(b),g=a(14),_=a.n(g),E=a(15),f=a.n(E),B=function(){return r.a.createElement("div",{className:_.a.Logo},r.a.createElement("img",{src:f.a,alt:"logo"}))},v=function(e){return r.a.createElement("header",{className:h.a.Toolbar},r.a.createElement("div",null,"MENU"),r.a.createElement(B,null),r.a.createElement("nav",null,"..."))},C=function(e){return r.a.createElement(d,null,r.a.createElement(v,null),r.a.createElement("main",{className:p.a.Content},e.children))},N=a(7),y=a(19),k=a(16),O=a.n(k),j=a(1),S=a.n(j),w=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=null;switch(this.props.type){case"bread-bottom":e=r.a.createElement("div",{className:S.a.BreadBottom});break;case"bread-top":e=r.a.createElement("div",{className:S.a.BreadTop},r.a.createElement("div",{className:S.a.Seeds1}),r.a.createElement("div",{className:S.a.Seeds2}));break;case"meat":e=r.a.createElement("div",{className:S.a.Meat});break;case"cheese":e=r.a.createElement("div",{className:S.a.Cheese});break;case"bacon":e=r.a.createElement("div",{className:S.a.Bacon});break;case"salad":e=r.a.createElement("div",{className:S.a.Salad});break;default:e=null}return e}}]),a}(n.Component),x=function(e){var t=Object.keys(e.ingredients).map((function(t){return Object(y.a)(Array(e.ingredients[t])).map((function(e,a){return r.a.createElement(w,{key:t+a,type:t})}))}));return 0===(t=t.flat()).length&&(t=r.a.createElement("p",null,"Please start adding ingredients!")),r.a.createElement("div",{className:O.a.Burger},r.a.createElement(w,{type:"bread-top"}),t,r.a.createElement(w,{type:"bread-bottom"}))},I=a(8),L=a.n(I),P=a(6),M=a.n(P),T=function(e){return r.a.createElement("div",{className:M.a.BuildControl},r.a.createElement("div",{className:M.a.Label},e.label),r.a.createElement("button",{className:M.a.Less,onClick:e.removed,disabled:e.disabled},"Less"),r.a.createElement("button",{className:M.a.More,onClick:e.added},"More"))},H=[{label:"Salad",type:"salad"},{label:"Bacon",type:"bacon"},{label:"Cheese",type:"cheese"},{label:"Meat",type:"meat"}],A=function(e){return r.a.createElement("div",{className:L.a.BuildControls},r.a.createElement("p",null,"Current Price: ",r.a.createElement("strong",null,e.price)),H.map((function(t){return r.a.createElement(T,{key:t.label,label:t.label,added:function(){return e.ingredientAdded(t.type)},removed:function(){return e.ingredientRemoved(t.type)},disabled:e.disabled[t.type]})})),r.a.createElement("button",{className:L.a.OrderButton,disabled:!e.purchasable,onClick:e.ordered},"ORDER NOW!"))},R=a(17),Y=a.n(R),J=a(18),D=a.n(J),W=function(e){return e.show?r.a.createElement("div",{className:D.a.Backdrop,onClick:e.clicked}):null},F=function(e){return r.a.createElement(d,null,r.a.createElement(W,{show:e.show,clicked:e.modalClosed}),r.a.createElement("div",{className:Y.a.Modal,style:{transform:e.show?"translateY(0)":"translateY(-100vh)",opacity:e.show?"1":"0"}},e.children))},X=a(9),Z=a.n(X),z=function(e){return r.a.createElement("button",{className:[Z.a.Button,Z.a[e.btnType]].join(" "),onClick:e.clicked},e.children)},G=function(e){var t=Object.keys(e.ingredients).map((function(t){return r.a.createElement("li",{key:t},r.a.createElement("span",{style:{textTransform:"capitalize"}},t),":"," ",e.ingredients[t])}));return r.a.createElement(d,null,r.a.createElement("h3",null,"Your Order"),r.a.createElement("p",null,"A delicious burger with the following ingredients:"),r.a.createElement("ul",null,t),r.a.createElement("p",null,r.a.createElement("strong",null,"Total Price: ",e.price)),r.a.createElement("p",null,"Continue to checkout?"),r.a.createElement(z,{clicked:e.purchaseCanceled,btnType:"Danger"},"CANCEL"),r.a.createElement(z,{clicked:e.purchaseContinue,btnType:"Success"},"CONTINUE"))},U={salad:.5,cheese:.4,meat:1.3,bacon:.7},K=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={ingredients:{salad:0,bacon:0,cheese:0,meat:0},totalPrice:4,purchasable:!1,purchasing:!1},e.purchaseHandler=function(){e.setState({purchasing:!0})},e.purchaseCancelHandler=function(){e.setState({purchasing:!1})},e.purchaseContinueHandler=function(){alert("You continue!")},e.addIngredientHandler=function(t){var a=Number(e.state.ingredients[t])+1,n=Object(N.a)({},e.state.ingredients);n[t]=Number(a);var r=Number(U[t]),l=e.state.totalPrice,c=Number(l+r).toFixed(2);e.setState({totalPrice:Number(c),ingredients:n}),e.updatePurchaseState(n)},e.removeIngredientHandler=function(t){var a=e.state.ingredients[t];if(!(a<=0)){var n=a-1,r=Object(N.a)({},e.state.ingredients);r[t]=Number(n);var l=Number(U[t]),c=Number(e.state.totalPrice),o=Number(c-l).toFixed(2);e.setState({totalPrice:Number(o),ingredients:r}),e.updatePurchaseState(r)}},e}return Object(i.a)(a,[{key:"updatePurchaseState",value:function(e){var t=Object.keys(e).map((function(t){return e[t]})).reduce((function(e,t){return e+t}),0);this.setState({purchasable:t>0})}},{key:"render",value:function(){var e=Object(N.a)({},this.state.ingredients);for(var t in e)e[t]=e[t]<=0;return r.a.createElement(d,null,r.a.createElement(F,{show:this.state.purchasing,modalClosed:this.purchaseCancelHandler},r.a.createElement(G,{ingredients:this.state.ingredients,price:this.state.totalPrice,purchaseCanceled:this.purchaseCancelHandler,purchaseContinue:this.purchaseContinueHandler})),r.a.createElement(x,{ingredients:this.state.ingredients}),r.a.createElement(A,{ingredientAdded:this.addIngredientHandler,ingredientRemoved:this.removeIngredientHandler,disabled:e,price:this.state.totalPrice,purchasable:this.state.purchasable,ordered:this.purchaseHandler}))}}]),a}(n.Component),Q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(C,null,r.a.createElement(K,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[20,1,2]]]);
//# sourceMappingURL=main.a7dc942d.chunk.js.map