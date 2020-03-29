import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detalhe() {
  const navigation = useNavigation();
  const route = useRoute();

  const caso = route.params.caso;
  const message = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}", com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}`;

  function navigationBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: {caso.titulo}`,
      recipients: [caso.email],
      body: message,
    });

  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5551993767171&text=${message}`);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={navigationBack}
        >
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{caso.nome} de {caso.cidade}/{caso.uf} </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{caso.descricao}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { 
                style: 'currency',
                currency: 'BRL'
              }).format(caso.valor)}
            </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>

          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}