/*
Grid for Clipboard panel
*/
Ax.clipboard_store = [];

Ax.clipboard_add = function(){
  Ax.clipboard_store.push(Ax.canvas.renderer.copy());
}

Ax.clipboard_load = function(index, x, y){
  Ax.canvas.renderer.paste(Ax.clipboard_store[index], x, y)
}

 Ax.Clipboard = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 store: new Ext.data.SimpleStore({
 id:0,
 fields:[
 {name: 'id', type: 'float'},
 {name: 'type'}
 ],
 data:[]
 }),
 columns:[
 {id:'id',header: "#", width: 20, sortable: true, dataIndex: 'id'},
 {header: "Type", sortable: true, dataIndex: 'type'}
 ],
 viewConfig:{forceFit:true,autoFill: true},
  border: false
 }); // eo apply
  
 // call parent
 Ax.Clipboard.superclass.initComponent.apply(this, arguments);
 } // eo function initComponent
  
 });
 
 Ext.reg('clipboard', Ax.Clipboard);
