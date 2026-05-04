import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Text, Divider, IconButton, Button, TextInput } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
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

        <View style={styles.iconosContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPressFavorito()
            }
          />

          <IconButton
            icon="pencil"
            size={28}
            onPress={props.onPressComentario}
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  resetForm() {
    this.setState({
      valoracion: 3,
      autor: '',
      comentario: '',
      showModal: false,
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );

    this.resetForm();
  }

  render() {
    const { route } = this.props;
    const excursionId = route.params.excursionId;

    const excursionSeleccionada = this.props.excursiones.excursiones.filter(
      (excursion) => excursion.id === excursionId
    )[0];

    const comentariosExcursion = this.props.comentarios.comentarios.filter(
      (comentario) => comentario.excursionId === excursionId
    );

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursionSeleccionada}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPressFavorito={() => this.marcarFavorito(excursionId)}
          onPressComentario={() => this.toggleModal()}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>
              Añadir comentario
            </Text>

            <View style={styles.valoracionContainer}>
              <IconButton
                icon={this.state.valoracion >= 1 ? 'star' : 'star-outline'}
                size={28}
                onPress={() => this.setState({ valoracion: 1 })}
              />

              <IconButton
                icon={this.state.valoracion >= 2 ? 'star' : 'star-outline'}
                size={28}
                onPress={() => this.setState({ valoracion: 2 })}
              />

              <IconButton
                icon={this.state.valoracion >= 3 ? 'star' : 'star-outline'}
                size={28}
                onPress={() => this.setState({ valoracion: 3 })}
              />

              <IconButton
                icon={this.state.valoracion >= 4 ? 'star' : 'star-outline'}
                size={28}
                onPress={() => this.setState({ valoracion: 4 })}
              />

              <IconButton
                icon={this.state.valoracion >= 5 ? 'star' : 'star-outline'}
                size={28}
                onPress={() => this.setState({ valoracion: 5 })}
              />
            </View>

            <Text style={styles.valoracionTexto}>
              {this.state.valoracion} estrellas
            </Text>

            <TextInput
              label="Autor"
              value={this.state.autor}
              onChangeText={(autor) => this.setState({ autor: autor })}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Comentario"
              value={this.state.comentario}
              onChangeText={(comentario) => this.setState({ comentario: comentario })}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="comment" />}
            />

            <View style={styles.botonesModal}>
              <Button
                mode="outlined"
                onPress={() => this.resetForm()}
              >
                Cancelar
              </Button>

              <Button
                mode="contained"
                onPress={() => this.gestionarComentario(excursionId)}
              >
                Enviar
              </Button>
            </View>
          </View>
        </Modal>

        <RenderComentario
          comentarios={comentariosExcursion}
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
    color: 'white',
  },
  iconosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valoracionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  valoracionTexto: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);