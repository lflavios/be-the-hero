import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Casos() {
  const [casos, setCasos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigationToDetail(caso) {
    navigation.navigate('Detalhe', { caso });
  }

  async function loadIncidents() {

    if (loading) {
      return;
    }

    if (total > 0 && casos.length == total) {
      return;
    }

    setLoading(true);

    const response = await api.get('casos', {
      params: { page }
    });

    setCasos([ ... casos, ... response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page+1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={casos}
        style={styles.incidentsList} 
        keyExtractor={ caso => String(caso.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: caso }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{caso.nome}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{caso.descricao}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { 
                style: 'currency',
                currency: 'BRL'
              }).format(caso.valor)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigationToDetail(caso)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes {caso.id}</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}