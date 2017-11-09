import {
  format,
  translationByPathGetter,
  getTranslationByPath,
  capitalizeFirstLetter,
} from './utilities'

describe('i18n/utilities', () => {
  describe('format', () => {
    it('returns empty string', () => {
      const testValue = format('')
      const result = ''

      expect(testValue).toEqual(result)
    })
    it('returns string as-is for empty parameter', () => {
      const testValue = format('hello {{}}!')
      const result = 'hello {{}}!'

      expect(testValue).toEqual(result)
    })
    it('returns string as-is if parameter is undefined', () => {
      const testValue = format('hello {{recipient}}!', { recipient: undefined })
      const result = 'hello {{recipient}}!'

      expect(testValue).toEqual(result)
    })
    it('returns formatted string with one parameter', () => {
      const testValue = format('hello {{recipient}}', { recipient: 'WORLD' })
      const result = 'hello WORLD'

      expect(testValue).toEqual(result)
    })
    it('returns formatted string with several parameters', () => {
      const testValue = format(
        '{{greeting}} {{recipient}}. This is JavaScript week {{week}}',
        {
          greeting: 'Hi',
          recipient: 'Ada',
          week: 23,
        }
      )
      const result = 'Hi Ada. This is JavaScript week 23'

      expect(testValue).toEqual(result)
    })
  })
  describe('translationByPathGetter', () => {
    it('returns function', () => {
      const testValue = typeof translationByPathGetter
      const result = 'function'

      expect(testValue).toEqual(result)
    })
  })
  describe('getTranslationByPath', () => {
    it('returns translation by path without params', () => {
      const translations = {
        header: {
          en: 'Welcome',
          sv: 'Välkommen',
        },
      }
      const testValue = getTranslationByPath(translations, {
        language: 'en',
        textKey: 'header',
      })
      const result = 'Welcome'

      expect(testValue).toEqual(result)
    })
    it('returns translation by path with params', () => {
      const translations = {
        header: {
          en: 'Welcome, {{name}}',
          sv: 'Välkommen, {{name}}',
        },
      }
      const testValue = getTranslationByPath(translations, {
        language: 'en',
        params: { name: 'Alan' },
        textKey: 'header',
      })
      const result = 'Welcome, Alan'

      expect(testValue).toEqual(result)
    })
  })
  describe('capitalizeFirstLetter', () => {
    it('returns empty', () => {
      const testValue = capitalizeFirstLetter('')
      const result = ''

      expect(testValue).toEqual(result)
    })
    it('returns string with capitalized first letter', () => {
      const testValue = capitalizeFirstLetter('need capital')
      const result = 'Need capital'

      expect(testValue).toEqual(result)
    })
  })
})
