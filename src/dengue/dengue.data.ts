interface DengueData {
    data_iniSE: number; // timestamp
    SE: number;
    casos_est: number;
    casos_est_min: number;
    casos_est_max: number;
    casos: number;
    p_rt1: number;
    p_inc100k: number;
    Localidade_id: number;
    nivel: number;
    id: number;
    versao_modelo: string;
    tweet: string | null;
    Rt: number;
    pop: number;
    tempmin: number | null;
    umidmax: number | null;
    receptivo: number;
    transmissao: number;
    nivel_inc: number;
    umidmed: number | null;
    umidmin: number | null;
    tempmed: number | null;
    tempmax: number | null;
    casprov: number;
    casprov_est: number | null;
    casprov_est_min: number | null;
    casprov_est_max: number | null;
    casconf: number | null;
    notif_accum_year: number;
  }
  