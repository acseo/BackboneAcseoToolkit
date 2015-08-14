# AcseoToolkit : Generic functions
#
app.module 'ACSEO.Toolkit', (AcseoToolkit, App, Bb, Mn, $, _) ->

  # Extend Marionette.ItemView with a custom inline errors insertion
  Mn.ItemView = Mn.ItemView.extend
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
