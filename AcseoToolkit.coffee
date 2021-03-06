# AcseoToolkit : Generic functions
#
app.module 'ACSEO.Toolkit', (AcseoToolkit, App, Bb, Mn, $, _) ->

  # Extend Marionette.ItemView with a custom inline errors insertion (LayoutView being an extension of ItemView, it will work as well)
  _.extend Mn.ItemView.prototype,
    onError: (model, collection) ->
      try
        errorsJson = $.parseJSON(collection.responseText)

        if errorsJson
          errors = errorsJson.errors.children

          for field of errors
            if errors[field].errors
              $('.field-' + field).addClass('has-error').find('.help-block[data-error]').html errors[field].errors.join(', ')
      catch e
        return

  # extend Marionette.AppRouter to be able to execute a "before" function to perform custom treatments
  _.extend Mn.AppRouter.prototype,
    execute: (callback, args, name) ->
      if @before
          @before.apply(router, args)
      if callback
          callback.apply(@, args)

    initialize: ->
      @on 'all', @storeRoute
      App.appHistory = []

      @acseoToolkitChannel = Bb.Radio.channel('AcseoToolkit')
      @acseoToolkitChannel.on('startSpinner', @startSpinner, @)
      @acseoToolkitChannel.on('stopSpinner', @stopSpinner, @)

    storeRoute: ->
      if App.appHistory[App.appHistory.length - 1] != Backbone.history.fragment
        App.appHistory.push Backbone.history.fragment

    startSpinner: ->
      App.spinner.show new AcseoToolkit.Spinner

    stopSpinner: ->
      App.spinner.reset()

  AcseoToolkit.Spinner = Mn.ItemView.extend
    template: '#tpl-spinner'
    className: 'spinner-container'
