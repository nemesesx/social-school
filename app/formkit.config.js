// formkit.config.js
import { defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

const config = defaultConfig({
  config: {
    classes: generateClasses({
      text: {
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-gray-700',
        input: 'w-full px-4 py-2 border rounded-lg text-gray-700',
        // Style for invalid input
        inputInvalid: 'border-red-500',
        // Style for error messages
        messages: 'text-red-500 mt-1',
        message: 'text-red-500'
      },
      password: {
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-gray-700',
        input: 'w-full px-4 py-2 border rounded-lg text-gray-700',
        inputInvalid: 'border-red-500',
        messages: '!text-red-500 mt-1',
        message: '!text-red-500'
      },
      submit: {
        outer: 'mb-5',
        input: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full'
      }
    })
  }
})

export default config
