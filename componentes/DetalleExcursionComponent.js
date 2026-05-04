import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Años.png')}
          style={styles.image}
        >
          <Text style={styles.tituloImagen}>
            {excursion.nombre}
          </Text>
        </ImageBackground>

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
    height: 200,
    justifyContent: 'center',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  tituloImagen: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'chocolate',
  },
});

export default DetalleExcursion;