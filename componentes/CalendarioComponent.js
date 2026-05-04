import React, { Component } from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Divider, Text } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
  };
};

class Calendario extends Component {
  render() {
    const { navigation } = this.props;
    const excursiones = this.props.excursiones.excursiones;

    const renderCalendarioItem = ({ item }) => {
      return (
        <View>
          <List.Item
            title={item.nombre}
            description={item.descripcion}
            titleNumberOfLines={0}
            descriptionNumberOfLines={6}
            left={(props) => (
              <Image
                source={{ uri: baseUrl + item.imagen }}
                style={[props.style, styles.imagen]}
                resizeMode="cover"
              />
            )}
            titleStyle={styles.titulo}
            descriptionStyle={styles.descripcion}
            contentStyle={styles.contenido}
            onPress={() =>
              navigation.navigate('DetalleExcursion', {
                excursionId: item.id
              })
            }
          />
          <Divider />
        </View>
      );
    };

    if (this.props.excursiones.isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <IndicadorActividad />
        </SafeAreaView>
      );
    } else if (this.props.excursiones.errMess) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.errorView}>
            <Text>{this.props.excursiones.errMess}</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={excursiones}
            renderItem={renderCalendarioItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagen: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  contenido: {
    paddingRight: 8,
  },
  titulo: {
    fontSize: 16,
  },
  descripcion: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorView: {
    margin: 20,
  },
});

export default connect(mapStateToProps)(Calendario);