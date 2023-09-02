import Cita from './src/components/Citas';
import Formulario from './src/components/Formulario';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';


export default function App() {

  const [mostrarForm, guardarMostrarForm] = useState(true);

  const [citas, setCitas] = useState([
    { id: '1', paciente: 'hook', propietario: 'alessandra', sintomas: 'Tos' },
    { id: '2', paciente: 'redux', propietario: 'kike', sintomas: 'Gripe' },
    { id: '3', paciente: 'native', propietario: 'luisa', sintomas: 'Fiebre' },
  ])
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id != id);
    })
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }


  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador Citas</Text>
      <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
        <Text style={styles.textMosrarForm}>Mostrar</Text>
      </TouchableHighlight>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
            <Text style={styles.titulo}>crear nueva cita</Text>
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm}
            />
          </>

        ) : (
          <>
            <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</Text>
            <FlatList style={styles.listado}
              data={citas}
              renderItem={({ item }) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />} />
          </>
        )}
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#AA0760",

  },
  titulo: {
    color: '#fff',
    fontSize: 32,
    marginTop: 36,
    textAlign: "center",
    fontWeight: "bold",
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1
  }
});
