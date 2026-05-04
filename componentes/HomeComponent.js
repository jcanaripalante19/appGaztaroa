import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  } else if (props.errMess) {
    return (
      <View style={styles.errorView}>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
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
    } else {
      return <View />;
    }
  }
}

class Home extends Component {
  render() {
    const cabeceras = this.props.cabeceras.cabeceras;
    const excursiones = this.props.excursiones.excursiones;
    const actividades = this.props.actividades.actividades;

    return (
      <ScrollView>
        <RenderItem
          item={cabeceras.filter((item) => item.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />

        <RenderItem
          item={excursiones.filter((item) => item.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />

        <RenderItem
          item={actividades.filter((item) => item.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
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
  errorView: {
    margin: 20,
  },
});

export default connect(mapStateToProps)(Home);