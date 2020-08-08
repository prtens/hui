import { PluginFunction } from "vue";

interface HUI extends PluginFunction<any> {}

declare const hui: HUI;
export default hui;
