import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react';

export default function Citas({cita,eliminarPaciente}) {
    const dialogoEliminar = id =>{
        eliminarPaciente(id);
    }

    return (
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente</Text>
                <Text style={styles.texto}>{cita.paciente}</Text>
            </View>

            <View>
                <Text style={styles.label} >propietario</Text>
                <Text style={styles.texto} >{cita.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>sintomas</Text>
                <Text style={styles.texto} >{cita.sintomas}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=> dialogoEliminar(cita.id)} style={styles.btnEliminar}>
                    <Text style={styles.txtEliminar}>Eliminar &times;</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    cita:{
        backgroundColor:'#fff',
        borderBottomColor:'black',
        borderStyle:'solid',
        borderBottomWidth:1,
        paddingVertical:14,
        paddingHorizontal:16,
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:10,
    },
    texto:{
        fontSize:15,
    },
    btnEliminar:{
        backgroundColor:'red',
        marginVertical:16,
        marginHorizontal:90,
        borderRadius:8,
        padding:11,
    },
    txtEliminar:{
        color:"white",
        fontWeight:'bold',
        textAlign:"center",
    }

})