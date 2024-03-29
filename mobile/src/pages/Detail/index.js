import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { Linking } from 'react-native'

import logoImg from '../../../assets/logo.png'
import styles from './styles'

export default function Detail() {

  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident

  const value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)
  const message = `Olá ${incident.name}, gostaria de  ajudar no caso "${incident.title}" com ${value}`

  function navigateBack() {
    navigation.goBack()
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }
  
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>ONG</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR</Text>
        <Text style={styles.incidentValue}>{value}</Text>

      </View>
        
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Salve o dia!</Text>
        <Text style={styles.contactTitle}>Seja o herói deste caso!</Text>

        <Text style={styles.contactDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-maill</Text>
          </TouchableOpacity>
        </View>
      </View>

  
    </View>
  )
}
