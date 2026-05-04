import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <Card.Title title={excursion.nombre} />
        <Card.Cover
          source={require('./imagenes/40Años.png')}
          style={styles.image}
        />
        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  render() {
    const { route, excursiones } = this.props;
    const excursionId = route.params.excursionId;

    const excursionSeleccionada = excursiones.filter(
      (excursion) => excursion.id === excursionId
    )[0];

    return (
      <RenderExcursion excursion={excursionSeleccionada} />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    marginHorizontal: 0,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DetalleExcursion;