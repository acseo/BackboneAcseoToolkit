/**
 * Include this template file after backbone-forms.amd.js to override the default templates
 *
 * 'data-*' attributes control where elements are placed
 */
;(function(Form) {

  Form.editors.Checkboxes = Form.editors.Checkboxes.extend({
    _arrayToHtml: function (array) {
      var html = $();
      var self = this;

      _.each(array, function(option, index) {
        var itemHtml = $('<li>');
        if (_.isObject(option)) {
          if (option.group) {
            var originalId = self.id;
            self.id += "-" + self.groupNumber++;
            itemHtml = $('<fieldset class="group">').append( $('<legend>').text(option.group) );
            itemHtml = itemHtml.append( self._arrayToHtml(option.options) );
            self.id = originalId;
            close = false;
          }else{
            var val = (option.val || option.val === 0) ? option.val : '';
            if (option.labelHTML){
              itemHtml.append( $('<label for="'+self.id+'-'+index+'">').html(option.labelHTML) );
            }
            else {
              itemHtml.append( $('<label for="'+self.id+'-'+index+'">').text(option.label) );
            }
            itemHtml.children("label").prepend( $('<input type="checkbox" name="'+self.getName()+'" id="'+self.id+'-'+index+'" />').val(val) );
          }
        }
        else {
          itemHtml.append( $('<input type="checkbox" name="'+self.getName()+'" id="'+self.id+'-'+index+'" />').val(option) );
          itemHtml.append( $('<label for="'+self.id+'-'+index+'">').text(option) );
        }
        html = html.add(itemHtml);
      });

      return html;
    }
  });

  /**
   * Bootstrap 3 templates
   */
  Form.template = _.template('\
    <form class="form-horizontal" role="form">\
      <div data-fieldsets></div>\
      <% if (submitButton) { %>\
        <button type="submit" class="btn"><%= submitButton %></button>\
      <% } %>\
    </form>\
  ');


  Form.Fieldset.template = _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend><%= legend %></legend>\
      <% } %>\
    </fieldset>\
  ');


  Form.Field.template = _.template('\
  <% if (editorAttrs && editorAttrs.type == "checkbox") { %>\
    <div class="field-<%= key %>">\
      <label class="control-label" for="<%= editorId %>">\
        <span data-editor></span>\
        <% if (titleHTML){ %><%= titleHTML %>\
        <% } else { %><%- title %><% } %>\
      </label>\
      <p class="help-block" data-error></p>\
      <p class="help-block"><%= help %></p>\
    </div>\
  <% } else { %>\
    <div class="field-<%= key %>">\
      <label class="control-label" for="<%= editorId %>">\
        <% if (titleHTML){ %><%= titleHTML %>\
        <% } else { %><%- title %><% } %>\
      </label>\
      <span data-editor></span>\
      <p class="help-block" data-error></p>\
      <p class="help-block"><%= help %></p>\
    </div>\
  <% } %>\
  ');


  // Form.editors.Base.prototype.className = 'form-control';
  Form.editors.Radio.template = _.template('\
    <% _.each(items, function(item) { %>\
      <li>\
        <label for="<%= item.id %>"><% if (item.labelHTML){ %><%= item.labelHTML %><% }else{ %><%- item.label %><% } %>\
          <input type="radio" name="<%= item.name %>" value="<%- item.value %>" id="<%= item.id %>" />\
        </label>\
      </li>\
    <% }); %>\
  ', null, Form.templateSettings);



  Form.NestedField.template = _.template('\
    <div class="field-<%= key %>">\
      <div title="<% if (titleHTML){ %><%= titleHTML %><% } else { %><%- title %><% } %>" class="input-xlarge">\
        <span data-editor></span>\
        <div class="help-inline" data-error></div>\
      </div>\
      <div class="help-block"><%= help %></div>\
    </div>\
  ');

  Form.Field.errorClassName = 'has-error';


  if (Form.editors.List) {

    Form.editors.List.template = _.template('\
      <div class="bbf-list">\
        <ul class="list-unstyled clearfix" data-items></ul>\
        <button type="button" class="btn bbf-add" data-action="add">Add</button>\
      </div>\
    ');


    Form.editors.List.Item.template = _.template('\
      <li class="clearfix">\
        <div class="pull-left" data-editor></div>\
        <button type="button" class="btn bbf-del" data-action="remove">&times;</button>\
      </li>\
    ');


    Form.editors.List.Object.template = Form.editors.List.NestedModel.template = _.template('\
      <div class="bbf-list-modal"><%= summary %></div>\
    ');

  }


})(Backbone.Form);
