import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function Formulario({ citas, setCitas, guardarMostrarForm }) {
    //guardar los datos de pacientes
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    // Fecha y Hora
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const ConfirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    // muestra y oculta time picker

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmarHora = (hora) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarHora(hora.toLocaleDateString('es-ES', opciones));
        hideTimePicker();
    };

    // crear nueva cita
    const crearNuevaCita = () => {
        if (paciente.trim() == '' || propietario.trim() == '' || telefono.trim() == '' ||
            sintomas.trim() == '' || fecha === '' || hora === '') {
            mostrarAlerta();
        }
        // crear una cita
        const cita = {paciente,propietario,telefono,fecha,hora,sintomas}
        cita.id=shortid.generate();
        //agregar al state
        const citasNuevo=[...citas,cita];
        setCitas(citasNuevo);
        // ocultar el formulario
        guardarMostrarForm(false);
    }

    // mostrar la alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios.',//mensaje
            [{
                text: "OK"
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>

                <View>
                    <Text style={styles.label} >Paciente:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)} />
                </View>

                <View>
                    <Text style={styles.label} >Dueño:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)} />
                </View>

                <View>
                    <Text style={styles.label} >Telefono Contacto:</Text>
                    <TextInput style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric' />
                </View>

                <View>
                    <Text style={styles.label} > Fecha:</Text>
                    <Button title='Show Date Picker' onPress={showDatePicker} />
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={ConfirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                    />
                </View>

                <View>
                    <Text style={styles.label} > Hora:</Text>
                    <Button title='Seleccionar hora' onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una hora"
                    />
                </View>

                <View>
                    <Text style={styles.label} >Sintomas:</Text>
                    <TextInput style={styles.input}
                        multiline
                        onChangeText={texto => guardarSintomas(texto)} />
                </View>

                <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnGuardar}>
                    <Text style={styles.textGuardar}>Guardar</Text>
                </TouchableHighlight>

            </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnGuardar: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
        marginHorizontal: 80,
        borderRadius: 20,
    },
    textGuardar: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    }
})

