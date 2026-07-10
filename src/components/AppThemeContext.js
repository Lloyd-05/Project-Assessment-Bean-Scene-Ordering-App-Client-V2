import { createContext, useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import lightTheme from "../themes/lightTheme.json";
import darkTheme from "../themes/darkTheme.json";