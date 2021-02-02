import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { NotesContext } from '../../contexts'
import TextInput from './TextInput'
import styles from './styles'

const Form = () => {
  const bodyTextInput = useRef()
  const noteId = useRoute().params
  const { goBack } = useNavigation()
  const { notes } = useContext(NotesContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSaveNote = () => {
    goBack()
  }

  useEffect(() => {
    if (noteId) {
      const { body, title } = notes.find(({ id }) => noteId === id) // eslint-disable-line no-shadow

      setTitle(title)
      setBody(body)
    }
  }, [noteId])

  return (
    <SafeAreaView style={styles.formScreen}>
      <RectButton style={styles.roundedBtn} onPress={handleSaveNote}>
        <Feather name="check" size={40} color="white" />
      </RectButton>

      <TextInput
        size={32}
        placeholder="Título"
        onSubmitEditing={() => bodyTextInput.current.focus()}
        onChangeText={setTitle}
        value={title}
        autoFocus={!noteId}
        blurOnSubmit={false}
      />
      <View style={styles.separator} />
      <ScrollView style={styles.bodyContainer}>
        <TextInput
          size={20}
          ref={bodyTextInput}
          placeholder="Escreva sua nota"
          onChangeText={setBody}
          value={body}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Form
