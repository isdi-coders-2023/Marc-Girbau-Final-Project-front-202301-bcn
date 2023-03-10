import { renderHook } from "@testing-library/react";
import { mockListOfGames } from "../../mocks/gamesMocks";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
import Wrapper from "../../mocks/Wrapper";
import {
  loadAllGamesActionCreator,
  loadMoreGamesActionCreator,
} from "../../redux/features/games/gamesSlice";
import { store } from "../../redux/store";
import useGames from "./useGames";
import { type ModalPayload } from "../../redux/features/ui/types";
import { activateModalActionCreator } from "../../redux/features/ui/uiSlice";

afterEach(() => {
  jest.clearAllMocks();
});

const spyDispatch = jest.spyOn(store, "dispatch");

describe("Given useGames hook", () => {
  describe("When the getAllGames function is called", () => {
    test("Then the dispatch should be called with the action to loadAllGames", async () => {
      const {
        result: {
          current: { getAllGames },
        },
      } = renderHook(() => useGames(), { wrapper: Wrapper });

      await getAllGames();

      expect(spyDispatch).toHaveBeenCalledWith(
        loadAllGamesActionCreator(mockListOfGames)
      );
    });
  });

  describe("When the getAllGames function is called", () => {
    test("Then the dispatch should be called with the action to loadMoreGames when the passed page is 1", async () => {
      const {
        result: {
          current: { getAllGames },
        },
      } = renderHook(() => useGames(), { wrapper: Wrapper });

      await getAllGames(1);

      expect(spyDispatch).toHaveBeenCalledWith(
        loadMoreGamesActionCreator(mockListOfGames)
      );
    });
  });

  describe("When the getAllGames function is called and the request to get the games is failed", () => {
    beforeEach(() => {
      server.resetHandlers(...errorHandlers);
    });
    test("Then the dispatch should be called with the action to show an error modal with the text `Unable to load games`", async () => {
      const {
        result: {
          current: { getAllGames },
        },
      } = renderHook(() => useGames(), { wrapper: Wrapper });

      const actionPayload: ModalPayload = {
        isError: true,
        modal: "Unable to load games",
      };

      await getAllGames();

      expect(spyDispatch).toHaveBeenCalledWith(
        activateModalActionCreator(actionPayload)
      );
    });
  });
});
