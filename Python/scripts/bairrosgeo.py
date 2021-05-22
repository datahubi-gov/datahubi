# importar os bairros georeferênciados
import geopandas as gpd
import pandas as pd
from unidecode import unidecode

def bairros():
    
    gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
    bairros = gpd.read_file("../dados/bairros.kml", driver='KML')
    bairros["Name"] = bairros["Name"].str.upper().apply(unidecode).str.replace("BAIRRO","",regex=False).str.strip() # coloca em maiusculo e retira acentuação e remove a palavra bairro
    bairros.columns = ['bairro', 'descricao', 'geometry'] # Renomeia as colunas
    return bairros