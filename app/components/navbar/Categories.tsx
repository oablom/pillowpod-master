"use client";

import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { IconType } from "react-icons";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiForestCamp,
  GiCastle,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

interface Category {
  label: string;
  icon: IconType;
  description: string;
}

export const categories: Category[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This property has a windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to the lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is close to a skiing area",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property is close to a camping area",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is close to a castle",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is close to a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has barns",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

const Categories: React.FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
