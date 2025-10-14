import HeaderReact from "@/components/header";
import UserItem from "@/components/useritem";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function UserList() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://192.168.0.143:3031/getUsuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <View style={styles.screen}>
      <HeaderReact />
      <ScrollView contentContainerStyle={styles.listContent}>
        {usuarios.map((item, index) => {
          let data = new FormData();
          data.append('nombre', item.nombre);
          data.append('mail', item.mail);
          data.append('telefono', item.telefono);
          data.append('direccion', item.direccion);
          data.append('foto', item.foto.replace('./', ''));

          return <UserItem key={index} userData={data} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
});
