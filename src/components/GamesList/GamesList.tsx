import React from "react";
import { Animated, FlatList, View } from "react-native";
import { type Games } from "../../redux/features/games/types";
import { useAppSelector } from "../../redux/hooks";
import GameCard from "../GameCard/GameCard";
import LoadMore from "../LoadMore/LoadMore";
import gamesListStyles from "./GamesListStyles";

interface GamesListProps {
  games: Games;
}

const GamesList = ({ games }: GamesListProps): JSX.Element => {
  const { current, total } = useAppSelector((state) => state.ui.pagination);

  const gapItem = (): JSX.Element => <View style={gamesListStyles.gap} />;
  const renderLoadMore = () =>
    current + 1 === total ? (
      <View style={{ marginBottom: 24 }} />
    ) : (
      <LoadMore />
    );

  const translateY = new Animated.Value(100);

  const animation = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <FlatList
        data={games}
        renderItem={({ item }) => <GameCard game={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onLayout={animation}
        ItemSeparatorComponent={gapItem}
        ListFooterComponent={renderLoadMore}
      />
    </Animated.View>
  );
};

export default GamesList;
