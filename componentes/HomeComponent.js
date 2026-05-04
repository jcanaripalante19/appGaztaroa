import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: baseUrl + item.imagen }}
        style={styles.image}
      >
        <Text style={styles.tituloImagen}>
          {item.nombre}
        </Text>
      </ImageBackground>

      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  render() {
    const cabeceras = this.props.cabeceras.cabeceras;
    const excursiones = this.props.excursiones.excursiones;
    const actividades = this.props.actividades.actividades;

    return (
      <ScrollView>
        <RenderItem item={cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
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

export default connect(mapStateToProps)(Home);