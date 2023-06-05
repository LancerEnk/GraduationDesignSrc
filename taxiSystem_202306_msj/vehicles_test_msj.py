# test basic instructions
# ctrl+shift+a : call up the liveCode
# ctrl+s : make the liveCode begin compile

# the import module
import time

from vehicleAccounts import vehicles
from vPositions_msj import VPositions
from cal_msj import uptime


if __name__ == '__main__':
    print(vehicles)
    print(VPositions)
    print(uptime)
    for i in range(len(VPositions)):
        time.sleep(uptime)
        # this 5 seconds means 0.5 minute
        print(VPositions[i])

def writeJS():
    # jsFile = open('./vehicles_msj.js', 'w+', encoding='utf-8')
    print("test")
