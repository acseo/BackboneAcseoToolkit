# AcseoToolkit : Alerts
#
# Called : App.module("ACSEO.Toolkit").Alert 'message', 'level'
#   level can be : success, warning, danger
#
app.module 'ACSEO.Toolkit', (AcseoToolkit, App, Bb, Mn, $, _) ->
    AcseoToolkit.AlertMessage = Bb.Model.extend {}

    AcseoToolkit.AlertBox = Mn.ItemView.extend
      template: '#tpl-alerte'
      # className: ->
      #   switch @model.get('level')
      #     when 'success'
      #       return 'msg-success-btn'
      #     when 'warning'
      #       return 'msg-alert-btn'
      #     else
      #       return 'msg-error-btn'

    AcseoToolkit.Alert = (text, level, persist = false) ->
      region = App.getRegion 'flash'

      message = new AcseoToolkit.AlertMessage
        message: text
        level: level

      if not persist
        region.once 'show', ->
          setTimeout ->
            region.empty()
          , 4000

      region.show new AcseoToolkit.AlertBox {model: message}

      return
