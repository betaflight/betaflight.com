/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDoc } from '@docusaurus/theme-common/internal';
import React from 'react';
import { Save, Cpu, Crosshair, MonitorStop, Rotate3D, Ruler, Thermometer } from 'lucide-react';
import SpecBox from '../SpecGrid/SpecBox';

export default function VersionInfo({ children }) {
  const { frontMatter } = useDoc();

  type Specs = {
    target: string
    mcu: string
    imu: string
    osd: string
    barometer: string
    blackbox: string
    dimensions: string
    mounting: string
    weight: string
  }

  const specs = frontMatter.sidebar_custom_props?.specs as Specs;

  const { target = '', mcu = '', imu = '', osd = '', barometer = '', blackbox: flash = '', dimensions = '', mounting = '', weight = '' } = specs;

  return (
    <div className="w-full flex 2xl:flex-row flex-col gap-2">
      <div className="aspect-square w-fit rounded-lg overflow-clip">{children}</div>
      <div className="2xl:aspect-square w-full h-fit grid grid-cols-3 grid-rows-3 gap-2">
        <SpecBox icon={<Crosshair size={24} />} title="Target:" color="primary" colSpan={2}>
          <div className="font-mono">{target}</div>
        </SpecBox>
        <SpecBox icon={<Cpu />} title="MCU:" color="secondary">
          {mcu}
        </SpecBox>
        <SpecBox icon={<Rotate3D />} title="IMU:" color="secondary">
          {imu}
        </SpecBox>
        <SpecBox icon={<MonitorStop />} title="OSD:" color="neutral">
          {osd}
        </SpecBox>
        <SpecBox icon={<Thermometer />} title="Baro:" color="neutral-light">
          {barometer}
        </SpecBox>
        <SpecBox icon={<Save />} title="Blackbox:" color="neutral-light">
          {flash}
        </SpecBox>
        <SpecBox icon={<Ruler />} title="Measurements:" color="neutral-light" colSpan={2}>
          <div className="flex gap-x-2 flex-wrap">
            <div>Size: {dimensions}</div>
            <div>Mounting: {mounting}</div>
            <div>Weight: {weight}</div>
          </div>
        </SpecBox>
      </div>
    </div>
  );
}
