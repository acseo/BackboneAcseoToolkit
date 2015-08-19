# AcseoToolkit : i18n functions
# In fact, we need to call i18n before launching Backbone app, so app.coffee needs to be changed instead of including it here
# Maybe it can be worth creating some sort of deferred call... ?
#
app.module 'ACSEO.Toolkit', (AcseoToolkit, App, Bb, Mn, $, _) ->

    # if i18n != undefined and Handlebars != undefined
    #   i18n.init
    #     resGetPath: '/locales/__lng__-__ns__.json'
    #     lng: $.cookies.get('i18next')
    #     fallbackLng: 'en'
    #     preload: [
    #       'en'
    #       'fr'
    #     ]

    #   Handlebars.registerHelper 'i18n', (str) ->
    #     return i18n.t(str)