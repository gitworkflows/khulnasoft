package com.example.myapplication

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class KhulnasoftContent(val name: String? = null, val data: KhulnasoftData? = null)

@Serializable
data class KhulnasoftBlock(
    val id: String? = null,
    val children: ArrayList<KhulnasoftBlock>? = null,
    val component: KhulnasoftBlockComponent? = null,
    var responsiveStyles: KhulnasoftBlockResponsiveStyles? = null
)

typealias KhulnasoftBlockStyles = Map<String, String?>

@Serializable
data class KhulnasoftBlockResponsiveStyles(
    val large: KhulnasoftBlockStyles? = null,
    val medium: KhulnasoftBlockStyles? = null,
    val small: KhulnasoftBlockStyles? = null
)

@Serializable
data class KhulnasoftBlockComponent(
    val name: String = "",
    val options: Map<String, JsonElement?>? = null
)

@Serializable
data class KhulnasoftData(val blocks: ArrayList<KhulnasoftBlock>? = null)