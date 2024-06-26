import React from 'react'
import IconUI from '@studio/components/IconUI'
import ThemeIcon from "@studio/components/ThemeIcon"

const makeTitle = slug => {
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

const themes = [
  'default',
  'light-grey',
  'dark'
]

const themeOptions = themes.map(theme => (
  {
    title: makeTitle(theme),
    value: theme,
    icon:  <ThemeIcon theme={theme}/>
  }
))

export default {
  title: 'Theme',
  name: 'theme',
  type: 'string',
  initialValue: 'default',
  components: { input: IconUI },
  options: {
    list: themeOptions
  }
}
