# README

## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|
|address|string|null: false|
|password|string|null: false|

### Association
- has_many :groups,through: :members
- has_many :messages

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,foreign_kye: true|
|body|text|
|image|text|

### Association
- belongs_to :user
- belongs_to :group

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_name|string|null: false|

### Association
- has_many :users,through: :members
- has_many :members
- has_many :groups


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

