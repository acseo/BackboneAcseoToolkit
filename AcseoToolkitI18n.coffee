# AcseoToolkit : i18n functions
#
app.module 'ACSEO.Toolkit', (AcseoToolkit, App, Bb, Mn, $, _) ->

    if i18n != undefined and Handlebars != undefined
      i18n.init
        resGetPath: '/locales/__lng__-__ns__.json'
        lng: 'fr'
        fallbackLng: 'en'
        preload: [
          'en'
          'fr'
        ]

      Handlebars.registerHelper 'i18n', (str) ->
        return i18n.t(str)