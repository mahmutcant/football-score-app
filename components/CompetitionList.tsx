import React from 'react';
import First from './First';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
const CompetitionList = () => {
    const styles = StyleSheet.create({
        denemeText: {
            color: 'black',
            padding: 20,
        },
        safeAreaStyle: {
            height: Dimensions.get('window').height,
        },
        scrollViewStyle: {
            flexGrow: 1,
        },
    });
    return(
        <SafeAreaView style={styles.safeAreaStyle}>
            <First/>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <Text style={styles.denemeText}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae molestias soluta error quod recusandae vero, voluptate magni dicta unde fugit minus totam veniam, quam laboriosam velit omnis iusto asperiores necessitatibus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, aut rerum possimus, cum perspiciatis aspernatur velit accusamus reprehenderit expedita delectus consectetur tempora nesciunt odit maiores culpa saepe iste dolor veritatis.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates quia quis quibusdam, consectetur perferendis quos quidem qui culpa, odio reprehenderit maxime ratione alias labore, assumenda blanditiis molestias placeat eius.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint culpa veritatis sunt eligendi unde ab! Maxime iure recusandae porro. Libero maxime dolore voluptate commodi odit sapiente eum adipisci eaque ab!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil praesentium itaque quos quisquam dolorum eveniet architecto? Quo, quam pariatur? Quisquam fugit ea odio est laborum molestias recusandae sapiente! Sed, explicabo!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, tenetur nemo dolor officia a animi doloribus similique molestiae id! Optio quas assumenda placeat consequatur. Placeat totam laudantium eum cumque pariatur.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate facilis provident rerum velit laborum, dolor cum est pariatur non temporibus saepe repudiandae enim officia mollitia impedit sapiente commodi soluta possimus.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At porro pariatur nam ut libero, expedita corporis asperiores eos nesciunt minima laudantium neque ea laboriosam sequi deserunt esse, reprehenderit excepturi rerum.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit ipsum natus reiciendis ducimus, alias quas dolores, illo optio, corporis dicta doloremque libero. Sunt tenetur molestiae, eveniet deserunt architecto omnis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nisi dolorum at illo expedita. Corrupti soluta maxime libero deleniti, doloremque quisquam inventore ullam, fugiat, expedita mollitia dolores suscipit eaque dolore?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit perferendis omnis nesciunt corrupti cupiditate, quasi, blanditiis inventore error nisi autem fugit maiores sed fuga ducimus facilis ratione ullam harum pariatur.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil praesentium itaque quos quisquam dolorum eveniet architecto? Quo, quam pariatur? Quisquam fugit ea odio est laborum molestias recusandae sapiente! Sed, explicabo!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, tenetur nemo dolor officia a animi doloribus similique molestiae id! Optio quas assumenda placeat consequatur. Placeat totam laudantium eum cumque pariatur.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate facilis provident rerum velit laborum, dolor cum est pariatur non temporibus saepe repudiandae enim officia mollitia impedit sapiente commodi soluta possimus.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At porro pariatur nam ut libero, expedita corporis asperiores eos nesciunt minima laudantium neque ea laboriosam sequi deserunt esse, reprehenderit excepturi rerum.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit ipsum natus reiciendis ducimus, alias quas dolores, illo optio, corporis dicta doloremque libero. Sunt tenetur molestiae, eveniet deserunt architecto omnis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nisi dolorum at illo expedita. Corrupti soluta maxime libero deleniti, doloremque quisquam inventore ullam, fugiat, expedita mollitia dolores suscipit eaque dolore?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit perferendis omnis nesciunt corrupti cupiditate, quasi, blanditiis inventore error nisi autem fugit maiores sed fuga ducimus facilis ratione ullam harum pariatur.
            </Text>
            <Text style={styles.denemeText}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae molestias soluta error quod recusandae vero, voluptate magni dicta unde fugit minus totam veniam, quam laboriosam velit omnis iusto asperiores necessitatibus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, aut rerum possimus, cum perspiciatis aspernatur velit accusamus reprehenderit expedita delectus consectetur tempora nesciunt odit maiores culpa saepe iste dolor veritatis.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates quia quis quibusdam, consectetur perferendis quos quidem qui culpa, odio reprehenderit maxime ratione alias labore, assumenda blanditiis molestias placeat eius.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint culpa veritatis sunt eligendi unde ab! Maxime iure recusandae porro. Libero maxime dolore voluptate commodi odit sapiente eum adipisci eaque ab!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil praesentium itaque quos quisquam dolorum eveniet architecto? Quo, quam pariatur? Quisquam fugit ea odio est laborum molestias recusandae sapiente! Sed, explicabo!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, tenetur nemo dolor officia a animi doloribus similique molestiae id! Optio quas assumenda placeat consequatur. Placeat totam laudantium eum cumque pariatur.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate facilis provident rerum velit laborum, dolor cum est pariatur non temporibus saepe repudiandae enim officia mollitia impedit sapiente commodi soluta possimus.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At porro pariatur nam ut libero, expedita corporis asperiores eos nesciunt minima laudantium neque ea laboriosam sequi deserunt esse, reprehenderit excepturi rerum.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit ipsum natus reiciendis ducimus, alias quas dolores, illo optio, corporis dicta doloremque libero. Sunt tenetur molestiae, eveniet deserunt architecto omnis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nisi dolorum at illo expedita. Corrupti soluta maxime libero deleniti, doloremque quisquam inventore ullam, fugiat, expedita mollitia dolores suscipit eaque dolore?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit perferendis omnis nesciunt corrupti cupiditate, quasi, blanditiis inventore error nisi autem fugit maiores sed fuga ducimus facilis ratione ullam harum pariatur.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil praesentium itaque quos quisquam dolorum eveniet architecto? Quo, quam pariatur? Quisquam fugit ea odio est laborum molestias recusandae sapiente! Sed, explicabo!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, tenetur nemo dolor officia a animi doloribus similique molestiae id! Optio quas assumenda placeat consequatur. Placeat totam laudantium eum cumque pariatur.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate facilis provident rerum velit laborum, dolor cum est pariatur non temporibus saepe repudiandae enim officia mollitia impedit sapiente commodi soluta possimus.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At porro pariatur nam ut libero, expedita corporis asperiores eos nesciunt minima laudantium neque ea laboriosam sequi deserunt esse, reprehenderit excepturi rerum.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit ipsum natus reiciendis ducimus, alias quas dolores, illo optio, corporis dicta doloremque libero. Sunt tenetur molestiae, eveniet deserunt architecto omnis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nisi dolorum at illo expedita. Corrupti soluta maxime libero deleniti, doloremque quisquam inventore ullam, fugiat, expedita mollitia dolores suscipit eaque dolore?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit perferendis omnis nesciunt corrupti cupiditate, quasi, blanditiis inventore error nisi autem fugit maiores sed fuga ducimus facilis ratione ullam harum pariatur.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
};

export default CompetitionList;
