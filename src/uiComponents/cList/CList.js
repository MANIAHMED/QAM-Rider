// import React from 'react';
// import {FlatList, RefreshControl, View, ActivityIndicator} from 'react-native';
// import {CLoading} from '../cLoading/CLoading';
// import * as PropTypes from 'prop-types';
// import styles from './CListStyle';
// import Theme from "../../utils/theme";

// function CList(props) {
//     const {data, loading, contentContainerStyle, onRefreshLoading, onRefreshHandler, isShowFooter, onEndReached, scrollEventThrottle, onEndThreshold} = props;
//     const renderFooterFunc = () => {
//         if (isShowFooter) {
//             return (
//                 <View style={styles.listFooter}>
//                     <ActivityIndicator size="large" color={Theme['light'].colors.primary} />
//                 </View>
//             );
//         }
//         return null;
//     };
//     return (
//         loading ? <CLoading loading={true}/> : <FlatList
//             {...props}
//             data={data}
//             refreshControl={onRefreshHandler ? <RefreshControl
//                 colors={Theme['light'].colors.primary}
//                 tintColor={Theme['light'].colors.primary}
//                 refreshing={onRefreshLoading}
//                 onRefresh={onRefreshHandler}
//             /> : null}
//             ListFooterComponent={renderFooterFunc}
//             contentContainerStyle={[
//                 contentContainerStyle,
//                 {flexGrow: data && data.length ? null : 1, position: 'relative'}
//             ]}
//             onEndReached={onEndReached}
//             onEndThreshold={onEndThreshold}
//             scrollEventThrottle={scrollEventThrottle}
//             keyExtractor={(item, index) => index}
//         />
//     );
// }

// CLoading.propTypes = {
//     style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//     contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//     data: PropTypes.array,
//     loading: PropTypes.bool,
//     onRefreshLoading: PropTypes.bool,
//     onRefreshHandler: PropTypes.func,
// };

// CLoading.defaultProps = {
//     style: {},
//     contentContainerStyle: {},
//     data: [],
//     loading: false,
//     onRefreshLoading: false,
//     onRefreshHandler: null
// };


// export default CList;