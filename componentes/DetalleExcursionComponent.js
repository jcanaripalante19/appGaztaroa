import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { COMENTARIOS } from '../comun/comentarios';

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

        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderComentarioItem = ({ item }) => {
    const fecha = new Date(item.dia.replaceAll(' ', ''));

    return (
      <View>
        <Text style={styles.comentarioTexto}>
          {item.comentario}
        </Text>

        <Text style={styles.comentarioTexto}>
          {item.valoracion} estrellas
        </Text>

        <Text style={styles.comentarioAutor}>
          -- {item.autor}, {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}
        </Text>

        <Divider />
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Comentarios"
        titleStyle={styles.tituloComentario}
      />

      <Card.Content>
        <FlatList
          data={comentarios}
          renderItem={renderComentarioItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId)
    });
  }

  render() {
    const { route, excursiones } = this.props;
    const excursionId = route.params.excursionId;

    const excursionSeleccionada = excursiones.filter(
      (excursion) => excursion.id === excursionId
    )[0];

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursionSeleccionada}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />

        <RenderComentario
          comentarios={this.state.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
          )}
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
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  tituloComentario: {
    textAlign: 'center',
  },
  comentarioTexto: {
    marginTop: 10,
    marginBottom: 4,
  },
  comentarioAutor: {
    marginTop: 4,
    marginBottom: 10,
  },
});

export default DetalleExcursion;