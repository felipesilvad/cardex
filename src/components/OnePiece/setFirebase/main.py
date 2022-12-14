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
  card_n = ws.acell('B3').value
  title = ws.acell('B1').value
  title_jp = ws.acell('A1').value
  title_clean = ws.acell('B1').value.replace('.',' ').strip()
  color = ws.acell('B5').value.replace('Color',' ').strip().split('/')
  card_type = ws.acell('B6').value.replace('Card Type',' ').strip()
  rarity = ws.acell('B7').value.replace('Rarity',' ').strip()
  cost = ws.acell('B8').value.replace('Cost/Life',' ')
  cost = int(cost)
  power = ws.acell('B9').value.replace('Power',' ')
  if power:
     if power != ' ':
      power = int(power)
  types = ws.acell('B10').value.replace('Type',' ').strip().split('/')
  types_jp = ws.acell('A12').value.replace('Type',' ').strip().split('/')
  counter = ws.acell('B11').value.replace('Counter+',' ').strip()
  if counter:
     if counter != ' ':
      counter = int(counter)
  attribute = ws.acell('B12').value.replace('Attribute',' ').strip()
  notes = ws.acell('B13').value.replace('Notes',' ').strip()
  effects_txt = ws.acell('B14').value[4:]
  effects = effects_txt.replace('] ','[').replace(']. ','[').split('[')
  effects = list(filter(None, effects))
  effects_txt_jp = ws.acell('A14').value
  effects_jp = effects_txt_jp.replace('】','【').split('【')
  effects_jp = list(filter(None, effects_jp))
  triggers_txt = ws.acell('B16').value
  triggers = ''
  if triggers_txt:
    triggers = triggers_txt.replace('] ','[').replace(']. ','[').split('[')
    triggers = list(filter(None, triggers))
  triggers_jp_txt = ws.acell('A16').value
  triggers_jp = ''
  if triggers_jp_txt:
    triggers_jp_txt = triggers_jp_txt.replace('【トリガー】 ',' ')
    triggers_jp_txt = triggers_jp_txt.replace('】','【').split('【')
    triggers_jp = list(filter(None, triggers_jp))
  artist = ws.acell('A17').value
  artist_P1 = ws.acell('A18').value
  artist_P2 = ws.acell('A19').value
  illust_type = ws.acell('B17').value
  illust_type_P1 = ws.acell('B18').value
  illust_type_P2 = ws.acell('B19').value
  source = ws.acell('C17').value
  source_P1 = ws.acell('C18').value
  source_P2 = ws.acell('C19').value
  regulations = ws.acell('A16').value
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
    img_P1 = storage.child("sets").child(set).child("EN").child(f"{card_n}_P1.png").get_url(None)
    img_P1_jp = storage.child("sets").child(set).child("JP").child(f"{card_n}_P1.png").get_url(None)

  doc_ref = db.collection(u'op').document(u'cards').collection(u'cards').document(card_n)
  doc_ref.set({
    u'title': title,
    u'set': set,
    u'card_n': card_n,
    u'title_jp': title_jp, 
    u'title_clean': title_clean, 
    u'color': color, 
    u'card_type': card_type, 
    u'rarity': rarity, 
    u'cost': cost, 
    u'cost': cost, 
    u'power': power, 
    u'types': types,
    u'types_jp': types_jp,
    u'counter': counter,
    u'attribute': attribute,
    u'notes': notes,
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

def setSet(set, cards):
  sh = gc.open(set)
  for i in range(1, cards+1):
    setCard(sh, f'Sheet{i}', set)
    time.sleep(40)

setSet('OP01', 3)

def testCard(sheet):
  ws = sh.worksheet(sheet)
  card_n = ws.acell('B3').value
  power = ws.acell('B9').value.replace('Power',' ')
  if power:
     if power != ' ':
      power = int(power)
  print(power)
# testCard('Sheet14')