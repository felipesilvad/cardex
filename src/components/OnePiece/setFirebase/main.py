from bs4 import BeautifulSoup
import requests
import time
import gspread
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from storage import storage

cred = credentials.Certificate("firebaseKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
gc = gspread.service_account(filename='sheetsKey.json')


def setCard(sh, sheet, set):
  ws = sh.worksheet(sheet)
  card_n = ws.acell('C2').value
  title = ws.acell('C1').value
  title_jp = ws.acell('A1').value
  title_clean = ws.acell('C1').value.replace('.',' ').strip()
  color_txt = ws.acell('C3').value
  color = color_txt.replace('Color',' ').strip().split('/')
  color_1 = color[0]
  color_2 = None
  if "/" in color_txt:
    color_2 = color[1]
  card_type = ws.acell('C4').value
  rarity = ws.acell('C5').value
  cost = ws.acell('C6').value
  cost = int(cost)
  power = ws.acell('C7').value
  if power:
     if power != ' ':
      power = int(power)
  types = ws.acell('C8').value
  if types:
    types = types.strip().split('/')
  types_jp = ws.acell('A12').value
  if types_jp:
    types_jp = types_jp.strip().split('/')
  counter = ws.acell('C9').value
  if counter:
     if counter != ' ':
      counter = int(counter)
  attribute = ws.acell('C10').value
  effects_txt = ws.acell('C11').value
  effects = ""
  if effects_txt:
    effects = effects_txt.replace('] ','[').replace(']. ','[').split('[')
    effects = list(filter(None, effects))
  effects_txt_jp = ws.acell('A14').value
  effects_jp = ""
  if effects_txt_jp:
    effects_jp = effects_txt_jp.replace('】','【').split('【')
    effects_jp = list(filter(None, effects_jp))
  triggers_txt = ws.acell('C12').value    
  triggers = ''
  if triggers_txt:
    triggers_txt = triggers_txt.replace('[Trigger] ',' ')
    triggers = triggers_txt.replace('] ','[').replace(']. ','[').split('[')
    triggers = list(filter(None, triggers))
  triggers_jp_txt = ws.acell('A16').value
  triggers_jp = ''
  if triggers_jp_txt:
    triggers_jp_txt = triggers_jp_txt.replace('【トリガー】 ',' ')
    triggers_jp_txt = triggers_jp_txt.replace('】','【').split('【')
    triggers_jp = list(filter(None, triggers_jp))
  artist = ws.acell('F2').value
  artist_P1 = ws.acell('F3').value
  artist_P2 = ws.acell('F4').value
  illust_type = ws.acell('D2').value
  illust_type_P1 = ws.acell('D3').value
  illust_type_P2 = ws.acell('D4').value
  source = ws.acell('E2').value
  source_P1 = ws.acell('E3').value
  source_P2 = ws.acell('E4').value
  regulations = ws.acell('C13').value
  if regulations:
    regulations = regulations.replace('Legal Regulations',' ')
  img = storage.child("sets").child(set).child("EN").child(f"{card_n}.png").get_url(None)
  img_jp = storage.child("sets").child(set).child("JP").child(f"{card_n}.png").get_url(None)
  img_P1 = None
  img_P1_jp = None
  if illust_type_P1:
    img_P1 = storage.child("sets").child(set).child("EN").child(f"{card_n}_P1.png").get_url(None)
    img_P1_jp = storage.child("sets").child(set).child("JP").child(f"{card_n}_P1.png").get_url(None)
  img_P2 = None
  img_P2_jp = None
  if illust_type_P2:
    img_P2 = storage.child("sets").child(set).child("EN").child(f"{card_n}_P2.png").get_url(None)
    img_P2_jp = storage.child("sets").child(set).child("JP").child(f"{card_n}_P2.png").get_url(None)

  doc_ref = db.collection(u'op').document(u'cards').collection(u'cards').document(card_n)
  doc_ref.set({
    u'title': title,
    u'set': set,
    u'card_n': card_n,
    u'title_jp': title_jp, 
    u'title_clean': title_clean, 
    u'color': color, u'color_1':color_1,u'color_2':color_2,
    u'card_type': card_type, 
    u'rarity': rarity, 
    u'cost': cost, 
    u'cost': cost, 
    u'power': power, 
    u'types': types,
    u'types_jp': types_jp,
    u'counter': counter,
    u'attribute': attribute,
    u'effects_txt': effects_txt,u'effects': effects,
    u'triggers_txt': triggers_txt,u'triggers': triggers,
    u'triggers_jp_txt': triggers_jp_txt,u'triggers_jp': triggers_jp,
    u'artist': artist,u'artist_P1': artist_P1,u'artist_P2': artist_P2,
    u'illust_type': illust_type,u'illust_type_P1': illust_type_P1,u'illust_type_P2': illust_type_P2,
    u'source': source,u'source_P1': source_P1,u'source_P2': source_P2,
    u'regulations': regulations,
    u'img': img,u'img_P1': img_P1,u'img_P2': img_P2,
    u'img_jp': img_jp,u'img_P1_jp': img_P1_jp,u'img_P2_jp': img_P2_jp,
  })
  print(card_n,title,' added')

def setSet(set, start,end):
  sh = gc.open(set)
  for i in range(start, end+1):
    setCard(sh, f'Sheet{i}', set)
    time.sleep(40)

setSet('ST05', 1, 17)

def testCard():
  color_txt = "ColorRed"
  color = color_txt.replace('Color',' ').strip().split('/')
  dual_color = False
  if "/" in color_txt:
    dual_color = True

  print(color[0])
# testCard()