import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUbigeo } from "src/services/ubigeo";

interface Ubigeo {
    _id: string;
    id_ubigeo: string;
    ubigeo_reniec: string;
    ubigeo_inei: string;
    departamento_inei: string;
    departamento: string;
    provincia_inei: string;
    provincia: string;
    distrito: string;
    region: string;
    macroregion_inei: string;
    macroregion_minsa: string;
    iso_3166_2: string;
    fips: string;
    superficie: string;
    altitud: string;
    latitud: string;
    longitud: string;
    Frontera: string;
  }
  

const useUbigeo = () => {
  const [ubigeos, setUbigeos] = useState<Ubigeo[]>([]);
  const [departments, setDepartments] = useState<Ubigeo[]>([]);
  const [provinces, setProvinces] = useState<Ubigeo[]>([]);
  const [districts, setDistricts] = useState<Ubigeo[]>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["ubigeo"],
    queryFn: getUbigeo,
  });

  useEffect(() => {
    if (data) {
      const ubigeos = data.data;
      setUbigeos(ubigeos);
      setDepartments(getUniqueDepartments(ubigeos));
    }
  }, [data]);

  const getUniqueDepartments = (ubigeos: Ubigeo[]): Ubigeo[] => {
    const uniqueDepartments: Ubigeo[] = [];
    const seenDepartments = new Map();

    for (const ubigeo of ubigeos) {
      if (!seenDepartments.has(ubigeo.departamento)) {
        seenDepartments.set(ubigeo.departamento, ubigeo.departamento_inei);
        uniqueDepartments.push({...ubigeo});
      }
    }
    return uniqueDepartments;
  };

  const getProvincesByDepartamento = (departamento: any) => {
    const filteredProvinces = ubigeos.filter(
      (ubigeo: any) => ubigeo.departamento === departamento
    );
    setProvinces(getUniqueProvinces(filteredProvinces));
  };

  const getUniqueProvinces = (ubigeosProvince: any) => {
    const uniqueProvinces = [];
    const seenProvinces = new Map();

    for (const ubigeo of ubigeosProvince) {
      if (!seenProvinces.has(ubigeo.provincia)) {
        seenProvinces.set(ubigeo.provincia, ubigeo.provincia_inei);
        uniqueProvinces.push({...ubigeo});
      }
    }

    return uniqueProvinces;
  };

  const getDistricts = (departamento: any, provincia: any) => {
    const filteredDistricts = ubigeos.filter(
      (ubigeo: any) =>
        ubigeo.departamento === departamento &&
        ubigeo.provincia === provincia
    );
    setDistricts(filteredDistricts);
  };

  return {
    isPending,
    error,
    departments,
    provinces,
    districts,
    getProvincesByDepartamento,
    getDistricts,
  };
};

export default useUbigeo;
